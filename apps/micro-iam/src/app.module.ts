import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RedisModule, RedisMode } from '@lib/redis/index';

@Module({
  imports: [
    RedisModule.register({
      mode: RedisMode.SINGLE,
      single: {
        host: '127.0.0.1',
        port: 6379,
        password: '123456',
        prefix: 'iam',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
