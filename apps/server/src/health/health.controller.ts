import { Controller, Get } from '@nestjs/common';
import { createResponse, Response } from '../utils/response';

interface Health {
  server: true;
  // TODO: Add chrome
}

@Controller('api/health')
export class HealthController {
  @Get()
  async getHealth(): Promise<Response<{ health: Health }>> {
    return createResponse(200, {
      health: {
        server: true,
      },
    });
  }
}
