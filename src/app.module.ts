import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpHandlerModule } from './infra/http-handler/http-handler.module';
import { ChitieuModule } from './modules/chitieu/chitieu.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TG_BOT_TOKEN,
      include: [ChitieuModule],
    }),
    ChitieuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
