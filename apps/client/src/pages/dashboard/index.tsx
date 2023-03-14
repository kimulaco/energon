import { useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { useUser } from '@/utils/user/useUser';
import { useElectric } from '@/utils/electric';
import { ElectricBill } from '@/interfaces';

const PageDashbord: FC = () => {
  const { state: userState, getUserInfo } = useUser();
  const { electric, getElectricBillList } = useElectric();

  const initPage = useCallback(async () => {
    if (userState.isLogined) return;

    await getUserInfo();
    await getElectricBillList();
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
    </div>
  );
};

export default PageDashbord;
