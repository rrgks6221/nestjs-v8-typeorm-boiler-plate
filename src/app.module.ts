import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        SERVER_URL: Joi.string().default('http://localhost:3000'),
      }),
    }),
    HealthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
