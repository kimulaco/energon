import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_GUARDS_NAME } from '../auth/constants';
import { createResponse, Response } from '../utils/response';

interface Health {
  server: true;
  // TODO: Add chrome
}

@Controller('api/health')
export class HealthController {
  @Get()
  @UseGuards(AuthGuard(AUTH_GUARDS_NAME))
  async getHealth(): Promise<Response<{ health: Health }>> {
    return createResponse(200, {
      health: {
        server: true,
      },
    });
  }
}
