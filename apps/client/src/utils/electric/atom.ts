import { atom } from 'recoil';
import { ElectricBill } from '@/interfaces';

export interface ElectricState {
  list: ElectricBill[];
}

export const electricAtom = atom<ElectricState>({
  key: 'electricBillAtom',
  default: {
    list: [],
  },
});
