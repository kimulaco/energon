import { Test } from '@nestjs/testing';
import { UserModule } from './user.module';
import { UserController } from './user.controller';

describe('UserModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(UserController)).toBeInstanceOf(UserController);
  });
});
