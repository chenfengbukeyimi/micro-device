import { DomainEvent, UnifiedIdVO } from '../tenant.import';

export class UserAssignedToDepartmentEvent implements DomainEvent {
  public readonly occurredAt: Date = new Date();

  public constructor(
    private readonly tenantId: UnifiedIdVO,
    public readonly departmentId: UnifiedIdVO,
    public readonly userId: UnifiedIdVO,
  ) {}
}
