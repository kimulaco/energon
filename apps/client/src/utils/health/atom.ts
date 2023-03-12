import { atom } from 'recoil';
import { Health } from '../../interfaces';

export const healthAtom = atom<Health>({
  key: 'healthAtom',
  default: {
    server: false,
  },
});
