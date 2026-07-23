import { Redis, Cluster } from 'ioredis';
import { DynamicModule, Module, Provider } from '@nestjs/common';

import {
  RedisMode,
  RedisConfig,
  OPTIONS_TYPE,
  createRawClient,
  RedisClientOption,
  getRawClientToken,
  getSvcClientToken,
  ASYNC_OPTIONS_TYPE,
  ClusterClientOption,
  MODULE_OPTIONS_TOKEN,
  ConfigurableModuleClass,
} from './define/index';
import { RedisService, ClusterService } from './service/index';

@Module({})
export class RedisModule extends ConfigurableModuleClass {
  static register(option: typeof OPTIONS_TYPE): DynamicModule {
    const RawClientToken = getRawClientToken(option.instanceName);
    const RawRedisProvider: Provider = {
      provide: RawClientToken,
      useFactory: (config: RedisConfig) => createRawClient(config),
      inject: [MODULE_OPTIONS_TOKEN],
    };

    const SvcClientToken = getSvcClientToken(option.instanceName);
    const SvcRedisProvider: Provider = {
      provide: SvcClientToken,
      useFactory: (config: RedisConfig) => {
        const mode = config.mode;
        const isCluster = mode === RedisMode.CLUSTER;

        const option = isCluster
          ? config.cluster
          : mode === RedisMode.SENTINEL
            ? config.sentinel
            : config.single;

        const client = createRawClient(config);

        return isCluster
          ? new ClusterService(client as Cluster, option as ClusterClientOption)
          : new RedisService(client as Redis, option as RedisClientOption);
      },
      inject: [MODULE_OPTIONS_TOKEN],
    };

    const { providers } = super.register(option);

    return {
      module: RedisModule,
      exports: [RawClientToken, SvcClientToken],
      providers: [...(providers ?? []), RawRedisProvider, SvcRedisProvider],
    };
  }

  static registerAsync(option: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const RawClientToken = getRawClientToken(option.instanceName);
    const RawRedisProvider: Provider = {
      provide: RawClientToken,
      useFactory: (config: RedisConfig) => createRawClient(config),
      inject: [MODULE_OPTIONS_TOKEN],
    };

    const SvcClientToken = getSvcClientToken(option.instanceName);
    const SvcRedisProvider: Provider = {
      provide: SvcClientToken,
      useFactory: (config: RedisConfig) => {
        const mode = config.mode;
        const isCluster = mode === RedisMode.CLUSTER;

        const option = isCluster
          ? config.cluster
          : mode === RedisMode.SENTINEL
            ? config.sentinel
            : config.single;

        const client = createRawClient(config);

        return isCluster
          ? new ClusterService(client as Cluster, option as ClusterClientOption)
          : new RedisService(client as Redis, option as RedisClientOption);
      },
      inject: [MODULE_OPTIONS_TOKEN],
    };

    const { providers } = super.registerAsync(option);

    return {
      module: RedisModule,
      exports: [RawClientToken, SvcClientToken],
      providers: [...(providers ?? []), RawRedisProvider, SvcRedisProvider],
    };
  }
}
