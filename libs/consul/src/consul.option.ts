// Consul 返回的字段结构
export interface ConsulKVPair {
  LockIndex: number;
  Key: string;
  Flags: number;
  Value: string;
  CreateIndex: number;
  ModifyIndex?: number;
}

// 特别注意: 敏感数据，必须加密后再配置到 Consul 中。
export interface ServiceOption {
  SERVICE_NAME: string;
  SERVICE_HOST: string;
  SERVICE_PORT: number;

  // 数据库的帐户密码，必须加密
  DATABASE_URL: string;
  [key: string]: unknown;
}

export type ConsulResult = null | ConsulKVPair;
