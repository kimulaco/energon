export const logger = {
  log(value: unknown) {
    if (!import.meta.env.DEV) return;
    console.log(value);
  },
  warn(value: unknown) {
    if (!import.meta.env.DEV) return;
    console.warn(value);
  },
  error(value: unknown) {
    if (!import.meta.env.DEV) return;
    console.error(value);
  },
};
