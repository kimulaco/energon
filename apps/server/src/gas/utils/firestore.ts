import type { DocumentData } from '@google-cloud/firestore';
import type { GasBill, Year, Month } from '../gas.interface';

export const createDocId = (year: Year, month: Month): string => {
  return `${year}_${month}`;
};

export const marshalGasBill = (data: DocumentData): GasBill => {
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
