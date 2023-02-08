import { Test, TestingModule } from '@nestjs/testing';
import { ElectricController } from './electric.controller';
import { ElectricService } from './electric.service';

describe('ElectricController', () => {
  let controller: ElectricController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectricController],
      providers: [ElectricService],
    }).compile();

    controller = module.get<ElectricController>(ElectricController);
  });

  describe('getBill()', () => {
    it('success get electric bill', async () => {
      const data = await controller.getBill('2023', '1');
      expect(data.statusCode).toBe(200);
      expect(data.bill).toEqual({
        year: 2023,
        month: 1,
        amount: 11365,
      });
    });

    it('year required', async () => {
      expect(controller.getBill('', '1')).rejects.toThrowError('year required');
    });

    it('month required', async () => {
      expect(controller.getBill('2023', '')).rejects.toThrowError(
        'month required',
      );
    });

    it('year is not numric', async () => {
      expect(controller.getBill('now', '1')).rejects.toThrowError(
        'year is not numric',
      );
    });

    it('month is not numric', async () => {
      expect(controller.getBill('2023', 'now')).rejects.toThrowError(
        'month is not numric',
      );
    });

    it('notfound electric bill', async () => {
      expect(controller.getBill('0', '0')).rejects.toThrowError(
        'notfound electric bill',
      );
    });
  });
});
