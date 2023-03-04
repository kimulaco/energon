import {
  Controller,
  Post,
  Body,
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserInfo } from './user.interface';
import { isEmptyParam } from '../utils/params';
import { createResponse, Response } from '../utils/response';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
      if (error.code === 403) {
        throw new ForbiddenException();
      }
      throw new InternalServerErrorException(
        error.message || 'Internal Server Error',
      );
    }
  }
}
