import { Module } from '@nestjs/common';
import { AppService } from '@src/app.service';
import { AppController } from '@src/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
