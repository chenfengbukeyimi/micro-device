# 领域驱动设计

## 特别注意事项

- 界限上下文，不得直接调用，必须通过领域事件通知，保证最终一致性。

- 领域事件: 当界限上下文存在状态变化，必须发布领域事件。

- 应用层: 只负责编排业务执行流程，不做任务业务逻辑处理。

- 职责方法: 值对象创建即自检；实体关心自身及关联变化；聚合提供对外访问入口。

## 领域模型

### 租户界限上下文

#### 部门实体类

#### 租户聚合类

### 用户界限上下文

| 字段               | 类型                             | 格式         | 描述                   |
| ------------------ | -------------------------------- | ------------ | ---------------------- |
| departmentId       | UnifiedIdVO                      | uuidv7       | 租户ID，只读。         |
| departmentName     | DepartmentNameVo                 | 大小写、中文 | 部门名称，唯一。       |
| departmentStatus   | enum(ACTIVE、FREEZED、ABOLISHED) | 枚举值       | 部门状态               |
| departmentParentId | UnifiedIdVO \| null              | uuidv7       | 租户父级ID，层级。     |
| userIds            | UnifiedIdVO[]                    | uuidv7       | 部门下所属用户ID列表。 |

#### 用户聚合类
