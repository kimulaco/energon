import { useCallback } from 'react';
import type { FC } from 'react';
import { Box, Typography } from '@mui/joy';
import { Link } from 'react-router-dom';
import { AppHeaderMenu } from './menu';
import { innerStyle, titleStyle, menuStyle, menuItemStyle } from './styles';
import type { UserState } from '../../utils/user';

interface Props {
  userState?: UserState;
  onClickLogout?: () => void;
}

const AppHeader: FC<Props> = ({ userState, onClickLogout }) => {
  const handleClickLogout = useCallback(() => {
    if (typeof onClickLogout === 'function') onClickLogout();
  }, [onClickLogout]);

  return (
    <header>
      <Box sx={innerStyle}>
        <Typography level="h1" sx={titleStyle}>
          Energon
        </Typography>

        <Box>
          <Box sx={menuStyle}>
            {userState?.isLogined && userState.user.name && (
              <Box sx={menuItemStyle}>
                <AppHeaderMenu
                  text={userState.user.name}
                  onClickLogout={handleClickLogout}
                />
              </Box>
            )}

            {userState && !userState.isLogined && userState.user.id && (
              <Box sx={menuItemStyle}>
                <Link to="/login">Login</Link>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </header>
  );
};

export default AppHeader;
