#!/bin/bash

# 确保脚本在遇到任何错误时立刻退出，防止带病运行
set -e

# 整合环境变量
echo "🚀 [1/3] 正在整合环境变量..."

# 循环遍历你的所有配置文件
for file in .config/env/common.env \
            .config/env/consul.env \
            .config/env/sqldb.env \
            .config/env/redis.env; do
    # 拼接当前文件内容
    cat "$file" >> .combined.env
    # 核心：在当前文件末尾强制追加一个换行符，防范未换行的文件
    echo "" >> .combined.env
done

cat .combined.env

## 清理旧容器并启动设施服务
echo "🔄 [2/3] 正在清理旧容器并重新拉起基础设施..."

# 💡 核心逻辑：从刚才整合的 .combined.env 中临时提取 NODE_ENV 的值
# 如果你的系统环境变量里已经提前 export 了 NODE_ENV，则优先使用系统变量
CURRENT_ENV=${NODE_ENV:-$(grep -E '^NODE_ENV=' .combined.env | cut -d '=' -f 2)}

# 防御性编程：如果既没有系统变量，.env 里也没配，则默认降级为 dev 环境
if [ -z "$CURRENT_ENV" ]; then
    CURRENT_ENV="dev"
fi

# 根据环境值，动态匹配对应的 docker-compose 文件名
COMPOSE_FILE=""
if [ "$CURRENT_ENV" == "prod" ] || [ "$CURRENT_ENV" == "production" ]; then
    COMPOSE_FILE="docker-compose.prod.yml"
    echo "🌍 [ENV] 检测到当前为 生产环境 (Production)，将加载: ${COMPOSE_FILE}"
else
    COMPOSE_FILE="docker-compose.dev.yml"
    echo "🛠️ [ENV] 检测到当前为 开发环境 (Development)，将加载: ${COMPOSE_FILE}"
fi



# 防御性编程：检查对应的 compose 文件在项目根目录下是否存在
if [ ! -f "$COMPOSE_FILE" ]; then
    echo "❌ [ERROR] 未找到对应的配置文件: ${COMPOSE_FILE}，请检查项目根目录！"
    rm -f .combined.env
    exit 1
fi


# 使用 -f 参数动态传入刚才判断好的 ${COMPOSE_FILE} 文件
docker compose --env-file .combined.env -f "$COMPOSE_FILE" down


## 清理临时文件
echo "🧹 [3/3] 正在清理临时文件..."
rm -f .combined.env

## 服务成功成功，列出相关服务信息
echo "🎉 [SUCCESS] 基础设施一键卸载成功！"
