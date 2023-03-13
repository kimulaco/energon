import { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/joy';
import { Outlet } from 'react-router-dom';
import AppHeader from '@/components/AppHeader/';
import { useHealth } from '@/utils/health/useHealth';
import { useUser } from '@/utils/user/useUser';

interface LayoutState {
  canRenderPage: boolean;
}

export const LayoutDashboard = () => {
  const [layoutState, setLayoutState] = useState<LayoutState>({
    canRenderPage: false,
  });
  const { verifyHealth } = useHealth();
  const { state: userState, logout } = useUser();

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
      await verifyHealth();
      setLayoutState({ canRenderPage: true });
    } catch {
      // TODO:
    }
  }, [userState.user.id, logout]);

  useEffect(() => {
    initLayout();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppHeader userState={userState} onClickLogout={handleClickLogout} />

      <Box sx={{ flexGrow: 1, padding: 1 }}>
        <main>{layoutState.canRenderPage && <Outlet />}</main>
      </Box>
    </Box>
  );
};
