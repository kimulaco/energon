import { createDocId } from './firestore';

describe('createDocId', () => {
  it('2023, 1', () => {
    expect(createDocId(2023, 1)).toBe('2023_1');
  });
});
