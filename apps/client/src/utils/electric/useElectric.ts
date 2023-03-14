import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { electricAtom, ElectricState } from './atom';
import { useAxios } from '@/utils/axios/useAxios';
import { ElectricBill } from '@/interfaces';

interface ResponseElectricBillList {
  statusCode: number;
  list: ElectricBill[];
}

export const useElectric = () => {
  const { doFetch } = useAxios<ResponseElectricBillList>('/api/electric/list', {
    method: 'get',
  });
  const [state, setState] = useRecoilState<ElectricState>(electricAtom);

  const getElectricBillList = useCallback(async (): Promise<ElectricBill[]> => {
    const data = await doFetch({
      useCache: true,
    });

    if (data?.list) setState({ ...state, list: data.list });

    return data?.list || [];
  }, [state]);

  return { electric: state, getElectricBillList };
};
