import { Test } from '@nestjs/testing';
import { GasModule } from './gas.module';
import { GasService } from './gas.service';
import { GasController } from './gas.controller';

describe('GasModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [GasModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(GasService)).toBeInstanceOf(GasService);
    expect(module.get(GasController)).toBeInstanceOf(GasController);
  });
});
