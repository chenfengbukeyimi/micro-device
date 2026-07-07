import {
  DomainEvent,
  UnifiedIdVO,
  TenantNameVO,
  TenantStatusVO,
} from '../tenant.import';

export class TenantCreatedEvent implements DomainEvent {
  public readonly occurredAt: Date = new Date();

  public constructor(
    public readonly tenantId: UnifiedIdVO,
    public readonly tenantName: TenantNameVO,
    public readonly tenantStatus: TenantStatusVO,
    public readonly departmentIds: UnifiedIdVO[] = [],
  ) {}
}
