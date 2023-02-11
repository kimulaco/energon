import { teardown as teardownDevServer } from 'jest-dev-server';

const globalTeardown = async () => {
  await teardownDevServer();
};

export default globalTeardown;
