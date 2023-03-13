import { useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { useUser } from '@/utils/user/useUser';

const PageIndex: FC = () => {
  const { state: userState, getUserInfo } = useUser();

  const initPage = useCallback(async () => {
    if (userState.isLogined) return;

    getUserInfo();
  }, [getUserInfo]);

  useEffect(() => {
    initPage();
  }, []);

  return (
    <div className="PageIndex">
      <p>top</p>
    </div>
  );
};

export default PageIndex;
