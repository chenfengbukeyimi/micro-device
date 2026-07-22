## 特别注意: 在部署 Redis 完毕，请在服务器(宿主机)执行以下命令，实现企业级标准配置。
# 允许 Redis 触发高效内存快照，防止高并发下因内存不足引发 fork 失败
sysctl vm.overcommit_memory=1
# 提高最大连接队列，应对身份平台的高并发握手
sysctl -w net.core.somaxconn=1024