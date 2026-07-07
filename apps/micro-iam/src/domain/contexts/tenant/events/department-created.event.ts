import {
  UnifiedIdVO,
  DepartmentNameVO,
  DepartmentStatusVO,
} from '../department/department.import';
import { DomainEvent } from '../tenant.import';

export class DepartmentCreatedEvent implements DomainEvent {
  public readonly occurredAt: Date = new Date();

  public constructor(
    private readonly tenantId: UnifiedIdVO,
    public readonly departmentId: UnifiedIdVO,
    public readonly departmentName: DepartmentNameVO,
    public readonly departmentStatus: DepartmentStatusVO,
    public readonly parentDepartmentId: UnifiedIdVO | null = null,
    public readonly userIds: UnifiedIdVO[] = [],
  ) {}
}
