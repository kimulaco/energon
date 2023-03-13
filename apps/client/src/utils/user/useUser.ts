import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useRecoilCallback } from 'recoil';
import Cookies from 'js-cookie';
import { userAtom } from './atom';
import { logger } from '@/utils/logger';
import { useAxios } from '@/utils/axios/useAxios';
import {
  ID_COOKIE_KEY,
  TOKEN_COOKIE_KEY,
  SESSION_COOKIE_OPTION,
} from '@/constants/cookie';
import { UserInfo } from '@/interfaces/user';

interface ResponseLogin {
  statusCode: number;
  user: UserInfo;
}

interface ResponseLogout {
  statusCode: number;
}

export const useUser = () => {
  const navigate = useNavigate();
  const [state, setState] = useRecoilState(userAtom);
  const resetState = useResetRecoilState(userAtom);
  const { doFetch: getUser } = useAxios<ResponseLogin>('/api/user/', {
    method: 'get',
  });
  const { doFetch: postLogin } = useAxios<ResponseLogin>('/api/user/login', {
    method: 'post',
  });
  const { doFetch: postLogout } = useAxios<ResponseLogout>('/api/user/logout', {
    method: 'post',
  });

  const login = useMemo(() => {
    return async (id: string, password: string): Promise<ResponseLogin> => {
      try {
        const data = await postLogin({
          config: { data: { id, password } },
        });

        if (!data) throw new Error('in process of login');

        Cookies.set(ID_COOKIE_KEY, data.user.id, SESSION_COOKIE_OPTION);
        Cookies.set(TOKEN_COOKIE_KEY, data.user.token, SESSION_COOKIE_OPTION);
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
          if (!user.id || !token) throw new Error('required login');

          const data = await postLogout({
            config: { data: { id: user.id } },
            useToken: true,
          });

          if (!data) throw new Error('in process fetching');
        } catch (error) {
          logger.error(error);
          throw error;
        } finally {
          Cookies.remove(ID_COOKIE_KEY);
          Cookies.remove(TOKEN_COOKIE_KEY);
          resetState();
          navigate('/login', { replace: true });
        }
      };
    },
    [state.user.id],
  );

  const getUserInfo = useCallback(async (): Promise<ResponseLogin> => {
    const id = Cookies.get(ID_COOKIE_KEY);
    const token = Cookies.get(TOKEN_COOKIE_KEY);

    try {
      if (!id || !token) throw new Error('required login');

      const data = await getUser({
        config: { url: `/api/user/${id}` },
        useToken: true,
        useCache: true,
      });

      if (!data) throw new Error('in process of login');

      setState({ user: data.user, isLogined: true });

      return data;
    } catch (error) {
      logger.error(error);
      Cookies.remove(ID_COOKIE_KEY);
      Cookies.remove(TOKEN_COOKIE_KEY);
      navigate('/login', { replace: true });
      throw error;
    }
  }, [setState]);

  return { state, login, logout, getUserInfo };
};
