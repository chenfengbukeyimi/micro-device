import { Redis, Cluster, ClusterOptions } from 'ioredis';

export type RedisClient = Redis | Cluster;

type RedisNode = { host: string; port: number };

type SingleRedisConfig = RedisNode & {
  prefix?: string;
  db?: number;
  username?: string;
  password?: string;
};

type ClusterRedisConfig = ClusterOptions & {
  prefix?: string;
  nodes: RedisNode[];
};

type SentinelRedisRole = 'master' | 'slave' | undefined;

type SentinelRedisConfig = {
  prefix?: string;
  name: string;
  sentinels: Array<RedisNode>;
  role?: SentinelRedisRole;
  password?: string;
  sentinelPassword?: string;
  enableTLSForSentinelMode?: boolean;
};

export type RedisClientConfig =
  SingleRedisConfig | ClusterRedisConfig | SentinelRedisConfig;

export type RedisClientOption = Exclude<RedisClientConfig, ClusterRedisConfig>;

export type ClusterClientOption = Exclude<
  RedisClientConfig,
  SingleRedisConfig | SentinelRedisConfig
>;

export enum RedisMode {
  SINGLE = 'SINGLE',
  CLUSTER = 'CLUSTER',
  SENTINEL = 'SENTINEL',
}

export type RedisConfig = {
  mode: RedisMode;
  instanceName?: string;
  single?: SingleRedisConfig;
  cluster?: ClusterRedisConfig;
  sentinel?: SentinelRedisConfig;
};

export type RedisValue = string | number | Buffer;
