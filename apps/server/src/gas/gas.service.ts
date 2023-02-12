import { Injectable } from '@nestjs/common';
import { createDocId, marshalGasBill } from './utils/firestore';
import { crawlGasBill } from './utils/crawler';
import { createFirestore, COLLECTION } from '../utils/firestore';
import type { GasBill } from './gas.interface';

@Injectable()
export class GasService {
  async getBill(year: number, month: number): Promise<GasBill | undefined> {
    const firestore = createFirestore();
    const collectionRef = firestore.collection(COLLECTION.GAS);
    const docId = createDocId(year, month);
    const snapshot = await collectionRef.doc(docId).get();

    if (!snapshot.exists) {
      return undefined;
    }

    return marshalGasBill(snapshot.data());
  }

  async getBillList(): Promise<GasBill[]> {
    const firestore = createFirestore();
    const collectionRef = firestore.collection(COLLECTION.GAS);
    const query = collectionRef
      .orderBy('year', 'desc')
      .orderBy('month', 'desc');
    const snapshot = await query.get();
    const billList: GasBill[] = [];

    snapshot.docs.forEach((doc) => {
      billList.push(marshalGasBill(doc.data()));
    });

    return billList;
  }

  async fetchBill(year: number, month: number): Promise<GasBill | undefined> {
    const amount = await crawlGasBill(year, month);

    if (!amount) {
      return undefined;
    }

    const firestore = createFirestore();
    const collectionRef = firestore.collection(COLLECTION.GAS);
    const docId = createDocId(year, month);
    const bill: GasBill = {
      year,
      month,
      amount,
    };

    await collectionRef.doc(docId).set(bill);

    return bill;
  }
}
