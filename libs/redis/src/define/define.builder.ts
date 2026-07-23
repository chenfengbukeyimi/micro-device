import { Redis, Cluster } from 'ioredis';
import { ConfigurableModuleBuilder } from '@nestjs/common';

import { RedisConfig, RedisClient, RedisMode } from './define.option';

export const {
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
  MODULE_OPTIONS_TOKEN,
  ConfigurableModuleClass,
} = new ConfigurableModuleBuilder<RedisConfig>()
  .setExtras(
    // 默认值
    { isGlobal: false, instanceName: 'default' },
    // 合并项
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  )
  .build();

export const createRawClient = (config: RedisConfig): RedisClient => {
  switch (config.mode) {
    case RedisMode.SINGLE: {
      return new Redis(config.single!);
    }

    case RedisMode.CLUSTER: {
      return new Redis(config.sentinel!);
    }

    case RedisMode.SENTINEL: {
      const { nodes, ...option } = config.cluster!;
      return new Cluster(nodes, option);
    }

    default: {
      throw new Error('Invalid Redis mode');
    }
  }
};

export const getRawClientToken = (instanceName: string = 'default'): string =>
  `${instanceName.toUpperCase()}_CLIENT_TOKEN`;

export const getSvcClientToken = (instanceName: string = 'default'): string =>
  `${instanceName.toUpperCase()}_SERVICE_TOKEN`;
