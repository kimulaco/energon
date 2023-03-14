import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { gasAtom, GasState } from './atom';
import { useAxios } from '@/utils/axios/useAxios';
import { GasBill } from '@/interfaces';

interface ResponseGasBillList {
  statusCode: number;
  list: GasBill[];
}

export const useGas = () => {
  const { doFetch } = useAxios<ResponseGasBillList>('/api/gas/list', {
    method: 'get',
  });
  const [state, setState] = useRecoilState<GasState>(gasAtom);

  const getGasBillList = useCallback(async (): Promise<GasBill[]> => {
    const data = await doFetch({
      useCache: true,
    });

    if (data?.list) setState({ ...state, list: data.list });

    return data?.list || [];
  }, [state]);

  return { gas: state, getGasBillList };
};
