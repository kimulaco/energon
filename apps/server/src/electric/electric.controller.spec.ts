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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('.getBill()', () => {
    it('success get electric bill', () => {
      const bill = controller.getBill('2023', '1');
      expect(bill).toEqual({
        year: 2023,
        month: 1,
        amount: 12398,
      });
    });

    it('year required', () => {
      const getBill = () => {
        return controller.getBill('', '1');
      };
      expect(getBill).toThrowError('year required');
    });

    it('month required', () => {
      const getBill = () => {
        return controller.getBill('2023', '');
      };
      expect(getBill).toThrowError('month required');
    });

    it('year is not numric', () => {
      const getBill = () => {
        return controller.getBill('now', '1');
      };
      expect(getBill).toThrowError('year is not numric');
    });

    it('month is not numric', () => {
      const getBill = () => {
        return controller.getBill('2023', 'now');
      };
      expect(getBill).toThrowError('month is not numric');
    });

    it('notfound electric bill', () => {
      const getBill = () => {
        return controller.getBill('0', '0');
      };
      expect(getBill).toThrowError('notfound electric bill');
    });
  });
});
