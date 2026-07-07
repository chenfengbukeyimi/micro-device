import { UnifiedIdVO } from '../department/department.import';
import { DomainEvent } from '../tenant.import';

export class DepartmentMovedEvent implements DomainEvent {
  public readonly occurredAt: Date = new Date();

  public constructor(
    private readonly tenantId: UnifiedIdVO,
    public readonly departmentId: UnifiedIdVO,
    public readonly parentDepartmentId: UnifiedIdVO | null,
    public readonly oldParentDepartmentId: UnifiedIdVO | null,
  ) {}
}
