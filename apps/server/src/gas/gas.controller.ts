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
import { GasService } from './gas.service';
import type { GasBill } from './gas.interface';
import { AUTH_GUARDS_NAME } from '../auth/constants';
import { isEmptyParam } from '../utils/params';
import { createResponse, Response } from '../utils/response';

@Controller('api/gas')
export class GasController {
  constructor(private readonly gasService: GasService) {}

  @Get()
  @UseGuards(AuthGuard(AUTH_GUARDS_NAME))
  async getBill(
    @Query('year') year: string,
    @Query('month') month: string,
  ): Promise<Response<{ bill: GasBill }>> {
    if (isEmptyParam(year)) throw new BadRequestException('year required');
    if (isEmptyParam(month)) throw new BadRequestException('month required');

    const _year = Number(year);
    const _month = Number(month);

    if (isNaN(_year)) throw new BadRequestException('year is not numric');
    if (isNaN(_month)) throw new BadRequestException('month is not numric');

    const Bill = await this.gasService.getBill(_year, _month);

    if (!Bill) throw new NotFoundException('notfound gas bill');

    return createResponse<{ bill: GasBill }>(200, {
      bill: Bill,
    });
  }

  @Get('list')
  @UseGuards(AuthGuard(AUTH_GUARDS_NAME))
  async getBillList(): Promise<Response<{ list: GasBill[] }>> {
    const BillList = await this.gasService.getBillList();

    return createResponse(200, {
      list: BillList,
    });
  }

  @Post('fetch')
  @UseGuards(AuthGuard(AUTH_GUARDS_NAME))
  async fetchBill(
    @Body('year') year: number,
    @Body('month') month: number,
  ): Promise<Response<{ bill: GasBill }>> {
    if (isEmptyParam(year)) throw new BadRequestException('year required');
    if (isEmptyParam(month)) throw new BadRequestException('month required');

    const _year = Number(year);
    const _month = Number(month);

    if (isNaN(_year)) throw new BadRequestException('year is not numric');
    if (isNaN(_month)) throw new BadRequestException('month is not numric');

    const Bill = await this.gasService.fetchBill(_year, _month);

    if (!Bill) throw new NotFoundException('notfound gas bill');

    return createResponse<{ bill: GasBill }>(200, {
      bill: Bill,
    });
  }
}
