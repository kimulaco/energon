import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import Cookies from "js-cookie";
import { logger } from "../logger/";
import { useFetch } from "../fetch/useFetch";
import { UserInfo } from "../../interfaces/user";

export interface UserState {
  user: UserInfo;
  isLogined: boolean;
}

const userState = atom<UserState>({
  key: "userState",
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

export const useUser = () => {
  const navigate = useNavigate();
  const { doFetch } = useFetch<ResponseLogin>();
  const [state, setState] = useRecoilState(userState);

  const login = useCallback(
    async (id: string, password: string): Promise<ResponseLogin> => {
      try {
        const data = await doFetch("/api/user/login", {
          method: "POST",
          body: { id, password },
        });

        if (!data) {
          throw new Error("in process of login");
        }

        Cookies.set(ID_COOKIE_KEY, data.user.id, {
          expires: 1,
          secure: true,
        });
        Cookies.set(TOKEN_COOKIE_KEY, data.user.token, {
          expires: 1,
          secure: true,
        });

        setState({
          user: data.user,
          isLogined: true,
        });

        return data;
      } catch (error) {
        logger.error(error);
        throw error;
      }
    },
    []
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

      if (!data) {
        throw new Error("in process of login");
      }

      setState({
        user: data.user,
        isLogined: true,
      });

      return data;
    } catch (error) {
      // logger.error(error);
      Cookies.remove(ID_COOKIE_KEY);
      Cookies.remove(TOKEN_COOKIE_KEY);
      navigate("/login", { replace: true });
      throw error;
    }
  }, []);

  return { state, login, getUserInfo };
};
