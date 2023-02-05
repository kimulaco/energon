import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ElectricService } from './electric.service';
import type { ElectricBill } from './electric.interface';
import { AUTH_GUARDS_NAME } from '../auth/constants';
import { createResponse, Response } from '../utils/response';

@Controller('api/electric')
export class ElectricController {
  constructor(private readonly electricService: ElectricService) {}

  @Get()
  @UseGuards(AuthGuard(AUTH_GUARDS_NAME))
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
  @UseGuards(AuthGuard(AUTH_GUARDS_NAME))
  async getBillList(): Promise<Response<{ list: ElectricBill[] }>> {
    const BillList = await this.electricService.getBillList();

    return createResponse(200, {
      list: BillList,
    });
  }

  @Post('fetch')
  @UseGuards(AuthGuard(AUTH_GUARDS_NAME))
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
