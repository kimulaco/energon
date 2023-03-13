import { atom } from 'recoil';
import { UserInfo } from '@/interfaces/user';

export interface UserState {
  user: UserInfo;
  isLogined: boolean;
}

export const userAtom = atom<UserState>({
  key: 'userAtom',
  default: {
    user: {
      id: '',
      name: '',
      token: '',
    },
    isLogined: false,
  },
});
