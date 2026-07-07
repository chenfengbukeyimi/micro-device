import {
  UnifiedIdVO,
  DepartmentNameVO,
  DepartmentStatusVO,
} from '../../../value-objects/index';

export interface DepartmentSnapshot {
  departmentId: string;
  departmentName: string;
  departmentStatus: string;
  parentDepartmentId: string | null;
}

interface DepartmentProp {
  departmentId: UnifiedIdVO;
  departmentName: DepartmentNameVO;
  departmentStatus: DepartmentStatusVO;
  parentDepartmentId: UnifiedIdVO | null;
}

export type DepartmentCreateProp = Omit<DepartmentProp, 'departmentStatus'>;
export type DepartmentHydrateProp = DepartmentProp;
