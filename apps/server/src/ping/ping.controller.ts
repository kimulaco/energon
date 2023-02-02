import { Controller, Get } from '@nestjs/common';
import { createResponse, Response } from '../utils/response';

interface Health {
  server: true;
  // TODO: Add chrome
}

@Controller('api/ping')
export class PingController {
  @Get()
  async getBillList(): Promise<Response<{ health: Health }>> {
    return createResponse(200, {
      health: {
        server: true,
      },
    });
  }
}
