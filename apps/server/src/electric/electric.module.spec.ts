import { Test } from '@nestjs/testing';
import { ElectricModule } from './electric.module';
import { ElectricService } from './electric.service';
import { ElectricController } from './electric.controller';

describe('ElectricModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [ElectricModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(ElectricService)).toBeInstanceOf(ElectricService);
    expect(module.get(ElectricController)).toBeInstanceOf(ElectricController);
  });
});
