import { atom } from 'recoil';
import { GasBill } from '@/interfaces';

export interface GasState {
  list: GasBill[];
}

export const gasAtom = atom<GasState>({
  key: 'gasBillAtom',
  default: {
    list: [],
  },
});
