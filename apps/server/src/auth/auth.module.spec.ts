import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { HeaderApiKeyStrategy } from './auth-header-api-key.strategy';

describe('AuthModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(PassportModule)).toBeInstanceOf(PassportModule);
    expect(module.get(ConfigModule)).toBeInstanceOf(ConfigModule);
    expect(module.get(HeaderApiKeyStrategy)).toBeInstanceOf(
      HeaderApiKeyStrategy,
    );
  });
});
