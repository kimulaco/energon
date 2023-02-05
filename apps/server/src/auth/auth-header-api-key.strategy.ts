import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import Strategy from 'passport-headerapikey';
import { AUTH_GUARDS_NAME, API_TOKEN_NAME } from './constants';

type DoneFunction = (
  error: UnauthorizedException | null,
  data: boolean | null,
) => void;

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(
  Strategy,
  AUTH_GUARDS_NAME,
) {
  constructor(private readonly configService: ConfigService) {
    super(
      {
        header: API_TOKEN_NAME,
        prefix: '',
      },
      true,
      (apiKey: string, done: DoneFunction): void => this.validate(apiKey, done),
    );
  }

  public validate = (apiKey: string, done: DoneFunction) => {
    if (this.configService.get<string>('X_ENERGON_API_TOKEN') === apiKey) {
      done(null, true);
      return;
    }

    done(new UnauthorizedException(), null);
  };
}
