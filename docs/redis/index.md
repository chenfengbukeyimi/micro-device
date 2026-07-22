# Redis 服务配置

**容器部署环境配置**

```bash
REDIS_DB=0
REDIS_TZ=Asia/Shanghai
REDIS_PORT=6379
REDIS_MODE=standalone
REDIS_VERSION=7.4-alpine
REDIS_PASSWORD=123456
REDIS_CONNECT_TIMEOUT=10000

# 哨兵主从配置
REDIS_NAME=master
REDIS_SENTINEL_MAX_CONNECTIONS=10



```

**单机独立部署配置内容**

```yml
services:
  micro-redis-standalone:
    image: redis:${REDIS_VERSION}
    container_name: micro-redis-standalone
    restart: always
    ports:
      - '${REDIS_PORT}:6379'
    volumes:
      - micro-redis-standalone-data:/data
    environment:
      - TZ=${REDIS_TZ}
      - REDIS_DB=${REDIS_DB}
      - REDIS_MODE=${REDIS_MODE}
      - REDIS_VERSION=${REDIS_VERSION}
      - REDIS_PASSWORD=${REDIS_PASSWORD}
      - REDIS_CONNECT_TIMEOUT=${REDIS_CONNECT_TIMEOUT}
    command: redis-server /etc/redis/redis.conf
```

**哨兵主从部署配置内容**

```yml

```

**集群分片部署配置内容**

```yml

```
