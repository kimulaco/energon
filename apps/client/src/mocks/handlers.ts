import { getHealth } from './api/health';
import { getUserInfo, login, logout } from './api/user';
import { getElectricList } from './api/electric';
import { getGasList } from './api/gas';

export const handlers = [
  // Health API
  getHealth,

  // User API
  getUserInfo,
  login,
  logout,

  // Electric API
  getElectricList,

  // Gas API
  getGasList,
];
