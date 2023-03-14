import { useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { useUser } from '@/utils/user/useUser';
import { useElectric } from '@/utils/electric';
import { useGas } from '@/utils/gas';
import { ElectricBill } from '@/interfaces';
import { GasBill } from '@/interfaces';

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
      <p>top</p>

      {Array.isArray(electric?.list) && electric.list.length > 0 && (
        <section>
          <h2>Electric</h2>
          {electric.list.map((bill: ElectricBill) => {
            return (
              <div key={`${bill.year}-${bill.month}`}>
                {bill.year}-{bill.month}: {bill.amount}
              </div>
            );
          })}
        </section>
      )}

      {Array.isArray(gas?.list) && gas.list.length > 0 && (
        <section>
          <h2>Gas</h2>
          {gas.list.map((bill: GasBill) => {
            return (
              <div key={`${bill.year}-${bill.month}`}>
                {bill.year}-{bill.month}: {bill.amount}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default PageDashbord;
