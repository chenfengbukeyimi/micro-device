import { DomainEvent } from '../tenant.import';
import { UnifiedIdVO } from '../department/department.import';

export class DepartmentDeletedEvent implements DomainEvent {
  public readonly occurredAt: Date = new Date();

  public constructor(
    private readonly tenantId: UnifiedIdVO,
    public readonly departmentId: UnifiedIdVO,
  ) {}
}
