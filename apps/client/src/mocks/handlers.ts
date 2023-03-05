import { getHealth } from './api/health';
import { getUserInfo, login, logout } from './api/user';

export const handlers = [
  // Health API
  getHealth,

  // User API
  getUserInfo,
  login,
  logout,
];
