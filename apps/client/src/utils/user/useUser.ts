import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  atom,
  useRecoilState,
  useResetRecoilState,
  useRecoilCallback,
} from "recoil";
import Cookies from "js-cookie";
import { logger } from "../logger/";
import { useFetch } from "../fetch/useFetch";
import { UserInfo } from "../../interfaces/user";

export interface UserState {
  user: UserInfo;
  isLogined: boolean;
}

const userAtom = atom<UserState>({
  key: "userAtom",
  default: {
    user: {
      id: "",
      name: "",
      token: "",
    },
    isLogined: false,
  },
});

interface ResponseLogin {
  statusCode: number;
  user: UserInfo;
}

const ID_COOKIE_KEY = "enrgid";
const TOKEN_COOKIE_KEY = "enrgt";
const COOKIE_OPTION: Cookies.CookieAttributes = {
  expires: 1 / 48, // 30 minutes
  secure: true,
};

export const useUser = () => {
  const navigate = useNavigate();
  const { doFetch } = useFetch<ResponseLogin>();
  const [state, setState] = useRecoilState(userAtom);
  const resetState = useResetRecoilState(userAtom);

  const login = useMemo(() => {
    return async (id: string, password: string): Promise<ResponseLogin> => {
      try {
        const data = await doFetch("/api/user/login", {
          method: "POST",
          body: { id, password },
        });

        if (!data) throw new Error("in process of login");

        Cookies.set(ID_COOKIE_KEY, data.user.id, COOKIE_OPTION);
        Cookies.set(TOKEN_COOKIE_KEY, data.user.token, COOKIE_OPTION);
        setState({ user: data.user, isLogined: true });

        return data;
      } catch (error) {
        logger.error(error);
        throw error;
      }
    };
  }, [setState]);

  const logout = useRecoilCallback(
    ({ snapshot }) => {
      return async (): Promise<void> => {
        const { user } = await snapshot.getPromise(userAtom);
        const token = Cookies.get(TOKEN_COOKIE_KEY);

        try {
          if (!user.id || !token) throw new Error("required login");

          const data = await doFetch("/api/user/logout", {
            method: "POST",
            headers: { "X-ENERGON-API-TOKEN": token },
            body: { id: user.id },
          });

          if (!data) throw new Error("in process fetching");

          Cookies.remove(ID_COOKIE_KEY);
          Cookies.remove(TOKEN_COOKIE_KEY);
          resetState();
          navigate("/login", { replace: true });
        } catch (error) {
          logger.error(error);
          throw error;
        }
      };
    },
    [state.user.id]
  );

  const getUserInfo = useCallback(async (): Promise<ResponseLogin> => {
    const id = Cookies.get(ID_COOKIE_KEY);
    const token = Cookies.get(TOKEN_COOKIE_KEY);

    try {
      if (!id || !token) throw new Error("required login");

      const data = await doFetch(`/api/user/${id}`, {
        headers: { "X-ENERGON-API-TOKEN": token },
        useCache: true,
      });

      if (!data) throw new Error("in process of login");

      setState({ user: data.user, isLogined: true });

      return data;
    } catch (error) {
      logger.error(error);
      Cookies.remove(ID_COOKIE_KEY);
      Cookies.remove(TOKEN_COOKIE_KEY);
      navigate("/login", { replace: true });
      throw error;
    }
  }, [setState]);

  return { state, login, logout, getUserInfo };
};
