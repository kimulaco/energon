import { STAGE } from '../src/utils/stage';

beforeAll(() => {
  process.env.STAGE_ENV = STAGE.TEST;
});
