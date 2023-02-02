import { Test, TestingModule } from '@nestjs/testing';
import { ElectricService } from './electric.service';

describe('ElectricService', () => {
  let service: ElectricService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectricService],
    }).compile();

    service = module.get<ElectricService>(ElectricService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
