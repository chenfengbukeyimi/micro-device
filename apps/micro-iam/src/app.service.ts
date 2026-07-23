import { Redis } from 'ioredis';
import { Inject, Injectable } from '@nestjs/common';
import { getRawClientToken } from '@lib/redis/index';

@Injectable()
export class AppService {
  constructor(@Inject(getRawClientToken()) private readonly client: Redis) {}

  public async getHello(): Promise<string> {
    const count = await this.client.get('count');

    const data = (Number(count) || 0) + 1;

    await this.client.set('count', data);

    return `Hello World! Count: ${data}!`;
  }
}
