import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { healthAtom } from './atom';
import { useAxios } from '@/utils/axios/useAxios';
import { Health } from '@/interfaces';

interface ResponseHealth {
  statusCode: number;
  health: Health;
}

export const useHealth = () => {
  const navigate = useNavigate();
  const { doFetch } = useAxios<ResponseHealth>('/api/health', {
    method: 'get',
  });
  const [state, setState] = useRecoilState<Health>(healthAtom);

  const getHealth = useCallback(async (): Promise<Health | undefined> => {
    const data = await doFetch({
      useCache: true,
    });

    if (data?.health.server) setState(data.health);

    return data?.health;
  }, [state]);

  const verifyHealth = useCallback(async (): Promise<void> => {
    try {
      const health = await getHealth();

      if (!health) return; // TODO: deplicate fetch

      if (!health.server) throw new Error('Server error'); // TODO: error message
    } catch (error) {
      navigate('/error?type=server_status', { replace: true });
    }
  }, [state, getHealth]);

  return { health: state, getHealth, verifyHealth };
};
