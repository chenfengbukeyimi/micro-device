#!/bin/bash
echo "正在等待 Redis 容器完全启动..."
sleep 5

echo "开始自动执行 Redis Cluster 握手与槽位分配..."
docker exec micro_device_cluster_master_1 redis-cli -a 123456 --cluster create \
  127.0.0.1:6379 \
  127.0.0.1:6379 \
  127.0.0.1:6379 \
  127.0.0.1:6379 \
  127.0.0.1:6379 \
  127.0.0.1:6379 \
  --cluster-replicas 1 --cluster-yes

echo "Redis 集群初始化完成！"

echo "查看集群状态命令示例："
echo "docker exec -it micro_device_cluster_master_1 redis-cli -c -a 123456 --cluster check 127.0.0.1:6379"



  # 127.0.0.1:6379 \
  # 127.0.0.1:6380 \
  # 127.0.0.1:6381 \
  # 127.0.0.1:6382 \
  # 127.0.0.1:6383 \
  # 127.0.0.1:6384 \


  #   micro_device_cluster_master_1:6379 \
  # micro_device_cluster_master_2:6379 \
  # micro_device_cluster_master_3:6379 \
  # micro_device_cluster_slave_1:6379 \
  # micro_device_cluster_slave_2:6379 \
  # micro_device_cluster_slave_3:6379 \