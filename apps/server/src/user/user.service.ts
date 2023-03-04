import { add as addDate } from 'date-fns';
import { Injectable } from '@nestjs/common';
import type { UserDoc, UserDocData } from './user.interface';
import { createFirestore, COLLECTION } from '../utils/firestore';
import { createUUID } from '../utils/uuid';

@Injectable()
export class UserService {
  async login(id: string, password: string): Promise<UserDocData | null> {
    const { ref, doc } = await this.getUser(id, password);
    const user = doc.data();
    const token = createUUID();
    const expireAt = addDate(new Date(), { minutes: 30 }).toLocaleString();

    const userData: UserDocData = {
      id: user.id,
      name: user.name,
      token,
      expireAt,
    };

    try {
      await ref.update({ token, expireAt });
    } catch (error) {
      console.error(error);
      throw { code: 500 };
    }

    return userData;
  }

  async getUser(id: string, password: string): Promise<UserDoc> {
    if (!id) {
      throw { code: 400, message: 'requred id' };
    }

    if (!password) {
      throw { code: 400, message: 'requred password' };
    }

    const firestore = createFirestore();
    const collectionRef = firestore.collection(COLLECTION.USER);
    const query = collectionRef
      .where('id', '==', id)
      .where('password', '==', password);
    const snapshot = await query.get();

    if (snapshot.size < 1) {
      throw { code: 403 };
    }

    if (snapshot.size !== 1) {
      throw { code: 500 };
    }

    const doc = snapshot.docs[0];

    return {
      ref: collectionRef.doc(doc.id),
      doc: doc,
    };
  }
}
