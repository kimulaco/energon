import type { FC, ReactNode } from 'react';
import { Box } from '@mui/joy';

interface Props {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: ReactNode;
}

export const AppPageTitle: FC<Props> = ({ as, children }) => {
  return (
    <Box component={as || 'h1'} sx={{ fontSize: '24px', mt: 0 }}>
      {children}
    </Box>
  );
};
