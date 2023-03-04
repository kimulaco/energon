import { FieldValue } from '@google-cloud/firestore';
import type {
  Firestore,
  CollectionReference,
  DocumentReference,
  QueryDocumentSnapshot,
  DocumentData,
} from '@google-cloud/firestore';
import { add as addDate, isBefore, getUnixTime, fromUnixTime } from 'date-fns';
import { createFirestore, COLLECTION } from '../firestore';
import { createUUID } from '../uuid';

export class UserStore {
  private firestore: Firestore;
  private collectionRef: CollectionReference<DocumentData>;
  ref: DocumentReference<DocumentData>;
  doc: QueryDocumentSnapshot<DocumentData>;

  constructor() {
    this.firestore = createFirestore();
    this.collectionRef = this.firestore.collection(COLLECTION.USER);
  }

  async find(
    id: string,
    password: string,
  ): Promise<{
    ref: DocumentReference<DocumentData>;
    doc: QueryDocumentSnapshot<DocumentData>;
  }> {
    const query = this.collectionRef
      .where('id', '==', id)
      .where('password', '==', password);
    const snapshot = await query.get();

    if (snapshot.size < 1) throw { code: 401 };
    if (snapshot.size > 1) throw { code: 500 };

    this.doc = snapshot.docs[0];
    this.ref = this.collectionRef.doc(this.doc.id);

    return { ref: this.ref, doc: this.doc };
  }

  async verifyToken(token: string): Promise<{
    ref: DocumentReference<DocumentData>;
    doc: QueryDocumentSnapshot<DocumentData>;
  }> {
    const query = this.collectionRef.where('token', '==', token);
    const snapshot = await query.get();

    if (snapshot.size < 1) throw { code: 401 };
    if (snapshot.size > 1) throw { code: 500 };

    this.doc = snapshot.docs[0];
    this.ref = this.collectionRef.doc(this.doc.id);
    const { expireAt } = this.doc.data();

    if (!isBefore(new Date(), fromUnixTime(expireAt))) throw { code: 401 };

    return { ref: this.ref, doc: this.doc };
  }

  async revokeToken(id: string, token: string): Promise<void> {
    const query = this.collectionRef
      .where('id', '==', id)
      .where('token', '==', token);
    const snapshot = await query.get();

    if (snapshot.size < 1) throw { code: 401 };
    if (snapshot.size > 1) throw { code: 500 };

    this.doc = snapshot.docs[0];
    this.ref = this.collectionRef.doc(this.doc.id);

    await this.ref.update({
      token: FieldValue.delete(),
      expireAt: FieldValue.delete(),
    });
  }

  async updateExpireAt(): Promise<void> {
    const expireAt = this.getNewExpireAt();
    await this.ref.update({ expireAt });
  }

  async updateToken(): Promise<{ token: string; expireAt: number }> {
    const token = createUUID();
    const expireAt = this.getNewExpireAt();

    await this.ref.update({ token, expireAt });

    return { token, expireAt };
  }

  private getNewExpireAt(): number {
    return getUnixTime(addDate(new Date(), { minutes: 30 }));
  }
}
