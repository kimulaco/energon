import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_GUARDS_NAME } from '../auth/constants';
import { createResponse, Response } from '../utils/response';

interface Health {
  server: true;
  // TODO: Add chrome
}

@Controller('api/ping')
export class PingController {
  @Get()
  @UseGuards(AuthGuard(AUTH_GUARDS_NAME))
  async getBillList(): Promise<Response<{ health: Health }>> {
    return createResponse(200, {
      health: {
        server: true,
      },
    });
  }
}
