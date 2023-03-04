import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { AUTH_GUARDS_NAME, API_TOKEN_NAME } from './constants';
import { UserStore } from '../utils/user/store';

type DoneFunction = (
  error: UnauthorizedException | null,
  data: boolean | null,
) => void;

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(
  Strategy,
  AUTH_GUARDS_NAME,
) {
  constructor() {
    super(
      {
        header: API_TOKEN_NAME,
        prefix: '',
      },
      true,
      async (apiKey: string, done: DoneFunction): Promise<void> =>
        this.validate(apiKey, done),
    );
  }

  public validate = async (token: string, done: DoneFunction) => {
    if (!token) {
      done(new UnauthorizedException(), null);
      return;
    }

    const userStore = new UserStore();

    try {
      await userStore.verifyToken(token);
      done(null, true);
    } catch (error) {
      console.error(error);
      done(new UnauthorizedException(), null);
    }
  };
}
