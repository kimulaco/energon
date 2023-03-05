export const logger = {
  log(value: unknown) {
    if (process.env.NODE_ENV !== 'development') return;
    console.log(value);
  },
  warn(value: unknown) {
    if (process.env.NODE_ENV !== 'development') return;
    console.warn(value);
  },
  error(value: unknown) {
    if (process.env.NODE_ENV !== 'development') return;
    console.error(value);
  },
};
