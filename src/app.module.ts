import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from '@src/config/typeorm-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        SERVER_URL: Joi.string().default('http://localhost:3000'),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.number().default(3306),
        DB_USER_NAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_DATABASE_NAME: Joi.string(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
    HealthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
