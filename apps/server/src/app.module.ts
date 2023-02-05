import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ElectricModule } from './electric/electric.module';
import { PingModule } from './ping/ping.module';

@Module({
  imports: [AuthModule, PingModule, ElectricModule],
})
export class AppModule {}
