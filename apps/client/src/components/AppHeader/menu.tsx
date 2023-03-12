import { useState, useMemo, useCallback } from 'react';
import type { FC, MouseEvent } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/joy';

interface Props {
  text: string;
  onClickLogout?: () => void;
}

export const AppHeaderMenu: FC<Props> = ({ text, onClickLogout }) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const open = useMemo<boolean>(() => {
    return Boolean(anchorEl);
  }, [anchorEl]);

  const handleClickMenu = useCallback(
    (event: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
      if (open) {
        setAnchorEl(null);
      } else {
        setAnchorEl(event.currentTarget);
      }
    },
    [open, setAnchorEl, onClickLogout],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleClickLogout = useCallback(() => {
    if (typeof onClickLogout === 'function') onClickLogout();
  }, [onClickLogout]);

  return (
    <Box>
      <Button
        size="sm"
        variant="plain"
        color="neutral"
        onClick={handleClickMenu}
      >
        {text}
      </Button>

      <Menu
        open={open}
        anchorEl={anchorEl}
        size="sm"
        variant="plain"
        onClose={handleClose}
      >
        <MenuItem onClick={handleClickLogout}>Login</MenuItem>
      </Menu>
    </Box>
  );
};
