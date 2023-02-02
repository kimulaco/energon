import { Module } from '@nestjs/common';
import { ElectricController } from './electric.controller';
import { ElectricService } from './electric.service';

@Module({
  controllers: [ElectricController],
  providers: [ElectricService],
})
export class ElectricModule {}
