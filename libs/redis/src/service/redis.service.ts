import { Redis } from 'ioredis';
import { Injectable } from '@nestjs/common';
import type { RedisValue, RedisClientOption } from '../define/index';

@Injectable()
export class RedisService {
  constructor(
    private readonly client: Redis,
    private readonly config: RedisClientOption,
  ) {}

  public getRawClient(): Redis {
    return this.client;
  }

  private serializeToLegitimateValue(data: unknown): RedisValue {
    const IsLegitimateValue =
      Buffer.isBuffer(data) ||
      typeof data === 'string' ||
      typeof data === 'number';
    if (IsLegitimateValue) return data;

    return JSON.stringify(data);
  }

  private deserializeFromLegitimateValue<T = string>(data: RedisValue): T {
    const IsLegitimateValue =
      Buffer.isBuffer(data) ||
      typeof data === 'string' ||
      typeof data === 'number';
    if (IsLegitimateValue) return data as T;

    return JSON.parse(data) as T;
  }
}
