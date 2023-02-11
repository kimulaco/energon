export const isEmptyParam = (value: unknown): boolean => {
  return typeof value === 'undefined' || value === null || value === '';
};
