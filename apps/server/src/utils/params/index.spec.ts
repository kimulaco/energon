import { isEmptyParam } from './index';

describe('isEmptyParam', () => {
  it('undefined', async () => {
    expect(isEmptyParam(undefined)).toBeTruthy();
  });

  it('null', async () => {
    expect(isEmptyParam(null)).toBeTruthy();
  });

  it('empty string', async () => {
    expect(isEmptyParam('')).toBeTruthy();
  });

  it('0', async () => {
    expect(isEmptyParam(0)).toBeFalsy();
  });

  it('false', async () => {
    expect(isEmptyParam(false)).toBeFalsy();
  });
});
