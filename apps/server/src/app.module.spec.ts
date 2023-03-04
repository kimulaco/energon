import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { ElectricModule } from './electric/electric.module';
import { GasModule } from './gas/gas.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';

describe('AppModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(AuthModule)).toBeInstanceOf(AuthModule);
    expect(module.get(ElectricModule)).toBeInstanceOf(ElectricModule);
    expect(module.get(GasModule)).toBeInstanceOf(GasModule);
    expect(module.get(HealthModule)).toBeInstanceOf(HealthModule);
    expect(module.get(UserModule)).toBeInstanceOf(UserModule);
  });
});
