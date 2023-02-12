import { STAGE } from '../src/utils/stage';
import { TEST_EXAMPLE_SITE_PORT } from './config';

beforeAll(() => {
  process.env.STAGE_ENV = STAGE.TEST;
  process.env.ELECTRIC_BILL_URL = `http://localhost:${TEST_EXAMPLE_SITE_PORT}/electric/login.html`;
  process.env.GAS_BILL_URL = `http://localhost:${TEST_EXAMPLE_SITE_PORT}/gas/login.html`;
});
