import { Firestore } from '@google-cloud/firestore';
import { STAGE } from '../stage';

export const createFirestore = (): Firestore => {
  const stage = process.env.STAGE_ENV || '';

  if (stage === STAGE.PRODUCTION) {
    return new Firestore();
  }

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
};
