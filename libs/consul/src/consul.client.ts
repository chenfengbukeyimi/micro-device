import Axios, { type AxiosError } from 'axios';

import type { ConsulKVPair, ConsulResult } from './consul.option';

export class ConsulClient {
  public static async LoadConfig(
    serviceName: string,
    consulAccessURL: string = 'http://localhost:8500',
    consulToken: string = '123456',
  ): Promise<ConsulResult> {
    try {
      const axios = Axios.create({ timeout: 5000 });
      const url = `${consulAccessURL}/v1/kv/config/${serviceName}`;

      const headers = consulToken ? { 'X-Consul-Token': consulToken } : {};

      const response = await axios.get(url, { headers });

      const [data] = response.data as ConsulKVPair[];

      const strData = Buffer.from(data.Value, 'base64').toString('utf-8');
      const list = strData.split('\n');
      const keyPattern = /([a-zA-Z0-9_]+)*:/;

      list.map((item) => {
        item = item.trim();
        return !item.startsWith('"') ? item.replace(keyPattern, '"$1":') : item;
      });

      const json = JSON.parse(list.join('\n')) as object;

      // 写入项目环境变量
      Object.keys(json).forEach(
        (key) => (process.env[key] = String(json[key])),
      );

      return json as ConsulResult;
    } catch (error) {
      const err = error as AxiosError;
      const status = err.response?.status || 'unknown';
      const message = err.message || '未知错误';

      console.error(
        `无法加载${serviceName}配置信息，错误码：${status}，错误信息：${message}。`,
      );
      return null;
    }
  }
}

// // 功能测试（特别提醒: 敏感数据，请加密后再配置到 consul 中）
// async function main() {
//   const config = await ConsulClient.LoadConfig('micro_iam');
//   console.log(config);
// }

// void main();
