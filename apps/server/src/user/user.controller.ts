import {
  Controller,
  Get,
  Post,
  Req,
  Param,
  Body,
  UseGuards,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';
import { UserInfo } from './user.interface';
import { AUTH_GUARDS_NAME, API_TOKEN_NAME } from '../auth/constants';
import { isEmptyParam } from '../utils/params';
import { createResponse, Response } from '../utils/response';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(AuthGuard(AUTH_GUARDS_NAME))
  async getUserInfo(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<Response<{ user: UserInfo | null }>> {
    const tokenHeader = request.headers[API_TOKEN_NAME.toLowerCase()];
    const token = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;

    if (isEmptyParam(id)) throw new BadRequestException('id required');
    if (!token) throw new BadRequestException();

    try {
      const user = await this.userService.getUserInfo(id, token);
      return createResponse<{ user: UserInfo }>(200, { user });
    } catch (error) {
      if (error.code === 400 && error.message) {
        throw new BadRequestException(error.message);
      }
      if (error.code === 401) {
        throw new UnauthorizedException();
      }
      throw new InternalServerErrorException(
        error.message || 'Internal Server Error',
      );
    }
  }

  @Post('logout')
  @UseGuards(AuthGuard(AUTH_GUARDS_NAME))
  async logout(
    @Body('id') id: string,
    @Req() request: Request,
  ): Promise<{ statusCode: number }> {
    const tokenHeader = request.headers[API_TOKEN_NAME.toLowerCase()];
    const token = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;

    if (isEmptyParam(id)) throw new BadRequestException('id required');
    if (!token) throw new BadRequestException();

    try {
      await this.userService.logout(id, token);
      return createResponse<{ user: UserInfo }>(200);
    } catch (error) {
      if (error.code === 400 && error.message) {
        throw new BadRequestException(error.message);
      }
      if (error.code === 401) {
        throw new UnauthorizedException();
      }
      throw new InternalServerErrorException(
        error.message || 'Internal Server Error',
      );
    }
  }

  @Post('login')
  async login(
    @Body('id') id: string,
    @Body('password') password: string,
  ): Promise<Response<{ user: UserInfo | null }>> {
    if (isEmptyParam(id)) throw new BadRequestException('id required');
    if (isEmptyParam(password))
      throw new BadRequestException('password required');

    try {
      const user = await this.userService.login(id, password);
      return createResponse<{ user: UserInfo }>(200, { user });
    } catch (error) {
      if (error.code === 400 && error.message) {
        throw new BadRequestException(error.message);
      }
      if (error.code === 401) {
        throw new UnauthorizedException();
      }
      throw new InternalServerErrorException(
        error.message || 'Internal Server Error',
      );
    }
  }
}
