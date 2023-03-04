import { Injectable } from '@nestjs/common';
import type { UserDocData } from './user.interface';
import { UserStore } from '../utils/user/store';

@Injectable()
export class UserService {
  async getUserInfo(id: string, token: string): Promise<UserDocData | null> {
    if (!id) throw { code: 400, message: 'requred id' };
    if (!token) throw { code: 400, message: 'requred token' };

    const userStore = new UserStore();

    try {
      const { doc } = await userStore.verifyToken(token);
      const user = doc.data();

      return {
        id: user.id,
        name: user.name,
        token,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async logout(id: string, token: string): Promise<void> {
    if (!id) throw { code: 400, message: 'requred id' };
    if (!token) throw { code: 400, message: 'requred token' };

    const userStore = new UserStore();

    try {
      await userStore.revokeToken(id, token);
    } catch (error) {
      console.error(error);
    }
  }

  async login(id: string, password: string): Promise<UserDocData | null> {
    if (!id) throw { code: 400, message: 'requred id' };
    if (!password) throw { code: 400, message: 'requred password' };

    const userStore = new UserStore();

    const { ref, doc } = await userStore.find(id, password);

    const user = doc.data();

    try {
      const { token, expireAt } = await userStore.updateToken();

      await ref.update({ token, expireAt });

      return {
        id: user.id,
        name: user.name,
        token,
      };
    } catch (error) {
      console.error(error);
      throw { code: 500 };
    }
  }
}
