import { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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

  const initLayout = useCallback(async () => {
    try {
      const data = await getHealth();

      if (!data) return;

      if (!data.health.server) throw new Error('Server error'); // TODO: error message

      setLayoutState({ canRenderPage: true });
    } catch {
      navigate('/error?type=server_status', { replace: true });
    }
  }, [userState.user.id, logout]);

  useEffect(() => {
    initLayout();
  }, []);

  return (
    <div className="LayoutDefault">
      <AppHeader userState={userState} onClickLogout={handleClickLogout} />

      <div>{layoutState.canRenderPage && <Outlet />}</div>
    </div>
  );
};

export default LayoutDefault;
