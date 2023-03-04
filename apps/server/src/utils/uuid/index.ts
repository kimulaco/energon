import { randomUUID } from 'crypto';

export const createUUID = (): string => {
  return randomUUID();
};
