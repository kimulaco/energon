import { Injectable } from '@nestjs/common';
import { createDocId, marshalElectricBill } from './utils/firestore';
import { crawlElectricBill } from './utils/crawler';
import { createFirestore, COLLECTION } from '../utils/firestore';
import type { ElectricBill } from './electric.interface';

@Injectable()
export class ElectricService {
  async getBill(
    year: number,
    month: number,
  ): Promise<ElectricBill | undefined> {
    const firestore = createFirestore();
    const collectionRef = firestore.collection(COLLECTION.ELECTRIC);
    const docId = createDocId(year, month);
    const snapshot = await collectionRef.doc(docId).get();

    if (!snapshot.exists) {
      return undefined;
    }

    return marshalElectricBill(snapshot.data());
  }

  async getBillList(): Promise<ElectricBill[]> {
    const firestore = createFirestore();
    const collectionRef = firestore.collection(COLLECTION.ELECTRIC);
    const query = collectionRef
      .orderBy('year', 'desc')
      .orderBy('month', 'desc');
    const snapshot = await query.get();
    const billList: ElectricBill[] = [];

    snapshot.docs.forEach((doc) => {
      billList.push(marshalElectricBill(doc.data()));
    });

    return billList;
  }

  async fetchBill(
    year: number,
    month: number,
  ): Promise<ElectricBill | undefined> {
    const amount = await crawlElectricBill(year, month);

    if (!amount) {
      return undefined;
    }

    const firestore = createFirestore();
    const collectionRef = firestore.collection(COLLECTION.ELECTRIC);
    const docId = createDocId(year, month);
    const bill: ElectricBill = {
      year,
      month,
      amount,
    };

    await collectionRef.doc(docId).set(bill);

    return bill;
  }
}
