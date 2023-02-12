import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ElectricModule } from './electric/electric.module';
import { GasModule } from './gas/gas.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [AuthModule, HealthModule, ElectricModule, GasModule],
})
export class AppModule {}
