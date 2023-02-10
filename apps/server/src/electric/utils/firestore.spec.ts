import { createDocId, marshalElectricBill } from './firestore';

describe('createDocId', () => {
  it('2023, 1', () => {
    expect(createDocId(2023, 1)).toBe('2023_1');
  });
});

describe('marshalElectricBill', () => {
  it('success marshal', () => {
    const data: { [field: string]: any } = {
      id: '2023_1',
      year: 2023,
      month: 1,
      amount: 5000,
    };
    expect(marshalElectricBill(data)).toEqual({
      year: 2023,
      month: 1,
      amount: 5000,
    });
  });

  it('failed marshal', () => {
    const data: { [field: string]: any } = {
      id: '2023_1',
      year: 2023,
      month: 1,
    };
    expect(() => {
      marshalElectricBill(data);
    }).toThrow('invalid document data');
  });
});
