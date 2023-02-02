import { Module } from '@nestjs/common';
import { ElectricModule } from './electric/electric.module';
import { PingModule } from './ping/ping.module';

@Module({
  imports: [ElectricModule, PingModule],
})
export class AppModule {}
