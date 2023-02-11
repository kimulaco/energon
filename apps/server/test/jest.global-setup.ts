import { setup as setupDevServer } from 'jest-dev-server';
import { TEST_EXAMPLE_SITE_PORT } from './config';

const globalSetup = async () => {
  await setupDevServer([
    {
      command: 'npm run test:example',
      port: TEST_EXAMPLE_SITE_PORT,
      debug: true,
      usedPortAction: 'error',
    },
  ]);
};

export default globalSetup;
