import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ElectricService } from './electric.service';
import type { ElectricBill } from './electric.interface';
import { createResponse, Response } from '../utils/response';

@Controller('api/electric')
export class ElectricController {
  constructor(private readonly electricService: ElectricService) {}

  @Get()
  async getBill(
    @Query('year') year: string,
    @Query('month') month: string,
  ): Promise<Response<{ bill: ElectricBill }>> {
    if (!year) throw new BadRequestException('year required');
    if (!month) throw new BadRequestException('month required');

    const _year = Number(year);
    const _month = Number(month);

    if (isNaN(_year)) throw new BadRequestException('year is not numric');
    if (isNaN(_month)) throw new BadRequestException('month is not numric');

    const Bill = await this.electricService.getBill(_year, _month);

    if (!Bill) throw new NotFoundException('notfound electric bill');

    return createResponse<{ bill: ElectricBill }>(200, {
      bill: Bill,
    });
  }

  @Get('list')
  async getBillList(): Promise<Response<{ list: ElectricBill[] }>> {
    const BillList = await this.electricService.getBillList();

    return createResponse(200, {
      list: BillList,
    });
  }

  @Post('fetch')
  async fetchBill(
    @Body('year') year: number,
    @Body('month') month: number,
  ): Promise<Response<{ bill: ElectricBill }>> {
    if (!year) throw new BadRequestException('year required');
    if (!month) throw new BadRequestException('month required');

    const _year = Number(year);
    const _month = Number(month);

    if (isNaN(_year)) throw new BadRequestException('year is not numric');
    if (isNaN(_month)) throw new BadRequestException('month is not numric');

    const Bill = await this.electricService.fetchBill(_year, _month);

    if (!Bill) throw new NotFoundException('notfound electric bill');

    return createResponse<{ bill: ElectricBill }>(200, {
      bill: Bill,
    });
  }
}
