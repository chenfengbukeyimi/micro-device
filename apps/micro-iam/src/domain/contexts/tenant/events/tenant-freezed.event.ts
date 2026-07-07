import { DomainEvent, UnifiedIdVO, TenantStatusVO } from '../tenant.import';

export class TenantFreezedEvent implements DomainEvent {
  public readonly occurredAt: Date = new Date();

  public constructor(
    public readonly tenantId: UnifiedIdVO,
    public readonly tenantStatus: TenantStatusVO,
    public readonly oldTenantStatus: TenantStatusVO,
  ) {}
}
