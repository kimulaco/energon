import { mockGoogleCloudFirestore } from 'firestore-jest-mock';

mockGoogleCloudFirestore({
  database: {
    ElectricBill: [
      {
        id: '2023_1',
        amount: 5000,
        month: 1,
        year: 2023,
      },
      {
        id: '2022_12',
        amount: 4000,
        month: 12,
        year: 2022,
      },
    ],
  },
});

import { createFirestore } from './index';

describe('createFirestore', () => {
  it('get document data', async () => {
    const firestore = createFirestore();
    const collectionRef = await firestore.collection('ElectricBill');
    const snapshot = await collectionRef.doc('2023_1').get();

    expect(snapshot.exists).toBeTruthy();
    expect(snapshot.data()).toEqual({
      amount: 5000,
      month: 1,
      year: 2023,
    });
  });
});
