-- 创建 authn 数据库
CREATE DATABASE micro_authn;
-- 创建 authz 数据库
CREATE DATABASE micro_authz;

-- 特别注意
-- iam_db 由 POSTGRES_DB 环境变量自动创建，无需重复写