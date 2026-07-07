import { DomainEvent, UnifiedIdVO, TenantNameVO } from '../tenant.import';

export class TenantNameChangedEvent implements DomainEvent {
  public readonly occurredAt: Date = new Date();

  public constructor(
    public readonly tenantId: UnifiedIdVO,
    public readonly tenantName: TenantNameVO,
    public readonly oldTenantName: TenantNameVO,
  ) {}
}
