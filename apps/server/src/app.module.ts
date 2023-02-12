import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CorsMiddleware } from './middlewares/cors/cors.middleware';
import { ElectricModule } from './electric/electric.module';
import { GasModule } from './gas/gas.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [AuthModule, HealthModule, ElectricModule, GasModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
