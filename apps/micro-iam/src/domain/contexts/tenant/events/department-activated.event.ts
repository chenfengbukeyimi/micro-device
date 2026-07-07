import {
  UnifiedIdVO,
  DepartmentStatusVO,
} from '../department/department.import';
import { DomainEvent } from '../tenant.import';

export class DepartmentActivatedEvent implements DomainEvent {
  public readonly occurredAt: Date = new Date();

  public constructor(
    private readonly tenantId: UnifiedIdVO,
    public readonly departmentId: UnifiedIdVO,
    public readonly departmentStatus: DepartmentStatusVO,
    public readonly oldDepartmentStatus: DepartmentStatusVO,
  ) {}
}
