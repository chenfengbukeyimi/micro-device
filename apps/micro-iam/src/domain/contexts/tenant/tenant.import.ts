import { DomainEvent, AggregateRoot } from '../../shared/index';

import {
  UnifiedIdVO,
  TenantNameVO,
  TenantStatusVO,
} from '../../value-objects/index';

import {
  TenantSnapshot,
  TenantCreateProp,
  TenantHydrateProp,
} from './tenant.interface';

import { DepartmentEntity } from './department/department.entity';

export {
  AggregateRoot,
  UnifiedIdVO,
  TenantNameVO,
  TenantStatusVO,
  DepartmentEntity,
  type DomainEvent,
  type TenantSnapshot,
  type TenantCreateProp,
  type TenantHydrateProp,
};
