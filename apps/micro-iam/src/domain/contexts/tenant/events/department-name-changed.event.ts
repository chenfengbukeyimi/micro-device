import { UnifiedIdVO, DepartmentNameVO } from '../department/department.import';
import { DomainEvent } from '../tenant.import';

export class DepartmentNameChangedEvent implements DomainEvent {
  public readonly occurredAt: Date = new Date();

  public constructor(
    private readonly tenantId: UnifiedIdVO,
    public readonly departmentId: UnifiedIdVO,
    public readonly departmentName: DepartmentNameVO,
    public readonly oldDepartmentName: DepartmentNameVO,
  ) {}
}
