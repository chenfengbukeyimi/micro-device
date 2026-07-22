# Consul 服务配置

**初始化文件目录**

```bash
# 初始化文件目录
mkdir ./.consul/{data,config}

#
touch ./.consul/config/acl.json
```

**初始化配置内容**

```json
// 详见 ./.consul/config/acl.json 文件内容

{
  /** 当前 Consul 集群的主数据中心名称 */
  "primary_datacenter": "dc1",

  /** 开启 Web UI 可视化 Web 管理后台 */
  "ui_config": { "enabled": true },

  /** 启用 ACL 访问控制列表安全机制 */
  "acl": {
    /** 启用 ACL 鉴权机制 */
    "enabled": true,
    /** 权限策略: 默认全拒绝 */
    "default_policy": "deny",
    /** 主 ACL 数据中心不可用时的容灾降级策略: 延长缓存 */
    "down_policy": "extend-cache",

    /** 开启 ACL 最高通行证: 管理员密码 */
    "tokens": {
      "initial_management": "123456"
    }
  }
}
```

**容器部署环境配置**

```bash
CONSUL_VERSION=1.15.4
CONSUL_WEB_PORT=8500
CONSUL_DNS_PORT=8600
CONSUL_TOKEN=123456
```

**容器部署配置内容**

```yml
service:
  micro-consul:
    image: consul:${CONSUL_VERSION}
    container_name: micro-consul
    ports:
      - '${CONSUL_WEB_PORT}:8500'
      - '${CONSUL_DNS_PORT}:8600/tcp'
      - '${CONSUL_DNS_PORT}:8600/udp'
    volumes:
      - './.consul/data:/consul/data'
      - './.consul/config:/consul/config'
    environment:
      # Docker 配置自动选取网卡
      - CONSUL_BIND_INTERFACE=eth0
    # -client=0.0.0.0 允许外部访问
    # -bootstrap-expect=1 启动实例为1个
    command: 'agent -server -bootstrap-expect=1 -client=0.0.0.0 -config-dir=/consul/config -data-dir=/consul/data'
```

**访问测试配置状态**

1. 执行命令`docker compose up -d`启动容器；

2. 访问`http://localhost:8500/ui`，输入密码登录；设置`kv`键值对保存，并推出登录。

3. 执行`docker compose down`销毁容器；再执行命令`docker compose up -d`启动容器；再访问`http://localhost:8500/ui`查看`KV`配置是否存在（正常: 存在）。
