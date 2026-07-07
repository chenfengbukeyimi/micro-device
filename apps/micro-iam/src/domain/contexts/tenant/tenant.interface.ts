import {
  UnifiedIdVO,
  TenantNameVO,
  TenantStatusVO,
  TenantStatus,
} from '../../value-objects/index';
import { DepartmentSnapshot } from './department/department.interface';
import { DepartmentEntity } from './department/department.entity';

export interface TenantSnapshot {
  tenantId: string;
  tenantName: string;
  tenantStatus: TenantStatus;
  departments: DepartmentSnapshot[];
}

interface TenantProp {
  tenantId: UnifiedIdVO;
  tenantName: TenantNameVO;
  tenantStatus: TenantStatusVO;
  departments: DepartmentEntity[];
}

export type TenantCreateProp = Omit<TenantProp, 'tenantStatus'>;
export type TenantHydrateProp = TenantProp;
