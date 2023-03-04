import { Injectable } from '@nestjs/common';
import type { UserDocData } from './user.interface';
import { UserStore } from '../utils/user/store';

@Injectable()
export class UserService {
  async login(id: string, password: string): Promise<UserDocData | null> {
    const userStore = await this.getUserStore(id, password);
    const user = userStore.doc.data();

    try {
      const { token, expireAt } = await userStore.updateToken();

      await userStore.ref.update({ token, expireAt });

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

  async getUserStore(id: string, password: string): Promise<UserStore> {
    if (!id) throw { code: 0, message: 'requred id' };
    if (!password) throw { code: 400, message: 'requred password' };

    const userStore = new UserStore();
    await userStore.find(id, password);

    return userStore;
  }
}
