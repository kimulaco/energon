import { mockGoogleCloudFirestore } from 'firestore-jest-mock';

mockGoogleCloudFirestore({
  database: {
    GasBill: [
      {
        id: '2023_1',
        amount: 5000,
        month: 1,
        year: 2023,
      },
      {
        id: '2022_12',
        amount: 4000,
        month: 12,
        year: 2022,
      },
    ],
  },
});

import { Test, TestingModule } from '@nestjs/testing';
import { GasController } from './gas.controller';
import { GasService } from './gas.service';
import { AnyForTest } from '../../test/types/';

describe('GasController', () => {
  let controller: GasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GasController],
      providers: [GasService],
    }).compile();

    controller = module.get<GasController>(GasController);
  });

  describe('getBill()', () => {
    it('success get gas bill', async () => {
      const data = await controller.getBill('2023', '1');
      expect(data.statusCode).toBe(200);
      expect(data.bill).toEqual({
        year: 2023,
        month: 1,
        amount: 5000,
      });
    });

    it('year required', async () => {
      expect(controller.getBill('', '1')).rejects.toThrow('year required');
    });

    it('month required', async () => {
      expect(controller.getBill('2023', '')).rejects.toThrow('month required');
    });

    it('year is not numric', async () => {
      expect(controller.getBill('now', '1')).rejects.toThrow(
        'year is not numric',
      );
    });

    it('month is not numric', async () => {
      expect(controller.getBill('2023', 'now')).rejects.toThrow(
        'month is not numric',
      );
    });

    it('notfound gas bill', async () => {
      expect(controller.getBill('0', '0')).rejects.toThrow('notfound gas bill');
    });
  });

  describe('getBillList()', () => {
    it('success get gas bill list', async () => {
      const data = await controller.getBillList();
      expect(data.statusCode).toBe(200);
      expect(data.list).toEqual([
        {
          amount: 5000,
          month: 1,
          year: 2023,
        },
        {
          amount: 4000,
          month: 12,
          year: 2022,
        },
      ]);
    });
  });

  describe('fetchBill()', () => {
    it('success fetch gas bill', async () => {
      const data = await controller.fetchBill(2022, 12);
      expect(data.statusCode).toBe(200);
      expect(data.bill).toEqual({
        amount: 4000,
        month: 12,
        year: 2022,
      });
    });

    it('year required', async () => {
      expect(
        controller.fetchBill('' as AnyForTest, '1' as AnyForTest),
      ).rejects.toThrow('year required');
    });

    it('month required', async () => {
      expect(
        controller.fetchBill('2023' as AnyForTest, '' as AnyForTest),
      ).rejects.toThrow('month required');
    });

    it('year is not numric', async () => {
      expect(
        controller.fetchBill('now' as AnyForTest, '1' as AnyForTest),
      ).rejects.toThrow('year is not numric');
    });

    it('month is not numric', async () => {
      expect(
        controller.fetchBill('2023' as AnyForTest, 'now' as AnyForTest),
      ).rejects.toThrow('month is not numric');
    });

    it('notfound gas bill', async () => {
      expect(controller.fetchBill(2000, 1)).rejects.toThrow(
        'notfound gas bill',
      );
    });
  });
});
