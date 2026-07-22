# SqlDb 服务配置

**初始化文件目录**

**容器部署环境配置**

```bash
SQLDB_TYPE=postgres
SQLDB_VERSION=16.14
SQLDB_PORT=5432
SQLDB_USER=user
SQLDB_PASSWORD=123456
SQLDB_RETRIES=3
SQLDB_TIMEOUT=5s
SQLDB_INTERVAL=5s
SQLDB_DEF_DB=micro_iam

## 多个数据库连接地址（提供给 ORM 连接）
SQLDB_IAM_DATABASE_URL=postgresql://user:123456@localhost:5432/micro_iam
SQLDB_AUTHN_DATABASE_URL=postgresql://user:123456@localhost:5432/micro_authn
SQLDB_AUTHZ_DATABASE_URL=postgresql://user:123456@localhost:5432/micro_authz
```

**容器部署配置内容**

```yml
services:
  micro-sqldb:
    image: ${SQLDB_TYPE}:${SQLDB_VERSION}
    container_name: micro-sqldb
    restart: always
    volumes:
      - micro-sqldb-data:/var/lib/postgresql/data
      - ./docker/sql/db.init.sql:/docker-entrypoint-initdb.d/init-multi-db.sql
    environment:
      POSTGRES_USER: ${SQLDB_USER}
      POSTGRES_PASSWORD: ${SQLDB_PASSWORD}
      ## 默认: 随便填
      POSTGRES_DB: ${SQLDB_DEF_DB}
    ports:
      - '${SQLDB_PORT}:5432'
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U ${SQLDB_USER} -d ${SQLDB_DEF_DB}']
      retries: ${SQLDB_RETRIES}
      timeout: ${SQLDB_TIMEOUT}
      interval: ${SQLDB_INTERVAL}

volumes:
  micro-sqldb-data:
```

**访问测试配置状态**

1. 通过`VS Code`插件，输入数据库帐户密码，连接到容器的`PostgreSQL`数据库，查看是否存在三个数据库(`micro_iam、micro_authn、micro_authz`)。
