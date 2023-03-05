import { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader/';
import { useAxios } from '../utils/axios/useAxios';
import { useUser } from '../utils/user/useUser';

interface Health {
  server: boolean;
}

interface ResponseHealth {
  statusCode: number;
  health: Health;
}

interface LayoutState {
  canRenderPage: boolean;
}

const LayoutDefault = () => {
  const [layoutState, setLayoutState] = useState<LayoutState>({
    canRenderPage: false,
  });
  const { state: userState, logout } = useUser();
  const { doFetch: getHealth } = useAxios<ResponseHealth>('/api/health', {
    method: 'get',
  });

  const handleClickLogout = useCallback(async () => {
    console.log(userState);
    try {
      await logout();
    } catch {
      // TODO: Use cache utility
    }
  }, [userState.user.id, logout]);

  useEffect(() => {
    getHealth()
      .then(() => {
        setLayoutState({ canRenderPage: true });
      })
      .catch(() => {
        // TODO: redirect error pag
      });
  }, []);

  return (
    <div className="LayoutDefault">
      <AppHeader userState={userState} onClickLogout={handleClickLogout} />

      <div>{layoutState.canRenderPage && <Outlet />}</div>
    </div>
  );
};

export default LayoutDefault;
