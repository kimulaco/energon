import { useEffect, useState, useCallback } from 'react';
import { Box } from '@mui/joy';
import { Outlet } from 'react-router-dom';
import AppHeader from '@/components/AppHeader/';
import { useHealth } from '@/utils/health/useHealth';

interface LayoutState {
  canRenderPage: boolean;
}

export const LayoutDefault = () => {
  const [layoutState, setLayoutState] = useState<LayoutState>({
    canRenderPage: false,
  });
  const { verifyHealth } = useHealth();

  const initLayout = useCallback(async () => {
    try {
      await verifyHealth();
      setLayoutState({ canRenderPage: true });
    } catch {
      // TODO:
    }
  }, []);

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
      <AppHeader />

      <Box sx={{ flexGrow: 1, padding: 1 }}>
        <main>{layoutState.canRenderPage && <Outlet />}</main>
      </Box>
    </Box>
  );
};
