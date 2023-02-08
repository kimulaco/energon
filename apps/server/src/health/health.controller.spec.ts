import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHealth()', () => {
    it('server is true if the response can be returned', async () => {
      const data = await controller.getHealth();
      expect(data.statusCode).toBe(200);
      expect(data.health.server).toBe(true);
    });
  });
});
