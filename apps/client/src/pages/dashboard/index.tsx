import { useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { StackedBarChart } from '@/components/StackedBarChart';
import { useUser } from '@/utils/user/useUser';
import { useElectric } from '@/utils/electric';
import { useGas } from '@/utils/gas';

const PageDashbord: FC = () => {
  const { state: userState, getUserInfo } = useUser();
  const { electric, getElectricBillList } = useElectric();
  const { gas, getGasBillList } = useGas();

  const initPage = useCallback(async () => {
    if (userState.isLogined) return;

    await getUserInfo();
    await Promise.all([getElectricBillList(), getGasBillList()]);
  }, [getUserInfo]);

  useEffect(() => {
    initPage();
  }, []);

  return (
    <div className="PageDashbord">
      <StackedBarChart
        electricBillList={electric?.list || []}
        gasBillList={gas?.list || []}
      />
    </div>
  );
};

export default PageDashbord;
