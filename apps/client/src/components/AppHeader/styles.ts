import type { AppSxProps } from '../../interfaces/mui';

export const innerStyle: AppSxProps = {
  width: '100%',
  padding: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid var(--joy-palette-divider)',
  boxSizing: 'border-box',
};

export const titleStyle: AppSxProps = {
  fontSize: '20px',
  padding: '4px 0',
};

export const menuStyle: AppSxProps = {
  display: 'flex',
  listStyle: 'none',
  padding: 0,
  margin: '-10px 0 0 -10px',
};

export const menuItemStyle: AppSxProps = {
  margin: '10px 0 0 10px',
};
