import type { DocumentData } from '@google-cloud/firestore';
import type { ElectricBill, Year, Month } from '../electric.interface';

export const COLLECTION = {
  BILL: 'ElectricBill',
} as const;

export const createDocId = (year: Year, month: Month): string => {
  return `${year}_${month}`;
};

export const marshalElectricBill = (data: DocumentData): ElectricBill => {
  const _year = Number(data.year);
  const _month = Number(data.month);
  const _amount = Number(data.amount);

  if (isNaN(_year) || isNaN(_month) || isNaN(_amount)) {
    throw new Error('invalid document data');
  }

  return {
    year: _year,
    month: _month,
    amount: _amount,
  };
};
