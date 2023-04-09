import { useMemo } from 'react';
import type { FC } from 'react';
import { Box } from '@mui/joy';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { ElectricBill, GasBill } from '@/interfaces';

interface Props {
  electricBillColor?: string;
  electricBillList: ElectricBill[];
  gasBillColor?: string;
  gasBillList: GasBill[];
}

export const StackedBarChart: FC<Props> = ({
  electricBillColor = '#ffbe00',
  electricBillList,
  gasBillColor = '#3db1e0',
  gasBillList,
}) => {
  const data = useMemo(() => {
    const _data: { name: string; Electric: number; Gas: number }[] = [];

    for (const electricBill of electricBillList || []) {
      const { year, month, amount } = electricBill;

      _data.unshift({
        name: `${year}-${month}`,
        Electric: amount,
        Gas: 0,
      });
    }

    for (const gasBill of gasBillList || []) {
      const { year, month, amount } = gasBill;
      const name = `${year}-${month}`;
      const index = _data.findIndex((dataItem) => dataItem.name === name);

      if (index === -1) continue;

      _data[index].Gas = amount;
    }

    return _data;
  }, [electricBillList, gasBillList]);

  return (
    <Box sx={{ height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Electric" stackId="bill" fill={electricBillColor} />
          <Bar dataKey="Gas" stackId="bill" fill={gasBillColor} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
