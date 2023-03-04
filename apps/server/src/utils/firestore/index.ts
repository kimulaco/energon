import { Firestore } from '@google-cloud/firestore';
import { STAGE } from '../stage';

export const COLLECTION = {
  ELECTRIC: 'ElectricBill',
  GAS: 'GasBill',
  USER: 'User',
} as const;

export const createFirestore = (): Firestore => {
  const stage = process.env.STAGE_ENV;

  /* istanbul ignore else */
  if (stage === STAGE.PRODUCTION || stage === STAGE.TEST) {
    return new Firestore();
  } else {
    const projectId = process.env.GCP_RUN_SERVICE_NAME || '';
    const keyFilename = process.env.GCP_BETA_KEY || '';

    if (!projectId) {
      throw new Error('required GCP_RUN_SERVICE_NAME');
    }

    if (!keyFilename) {
      throw new Error('required GCP_BETA_KEY');
    }

    return new Firestore({
      projectId,
      keyFilename,
    });
  }
};
