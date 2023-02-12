import { Module } from '@nestjs/common';
import { GasController } from './gas.controller';
import { GasService } from './gas.service';

@Module({
  controllers: [GasController],
  providers: [GasService],
})
export class GasModule {}
