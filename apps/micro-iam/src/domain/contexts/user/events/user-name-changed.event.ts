import { DomainEvent, UnifiedIdVO, UserNameVO } from '../user.import';

export class UserNameChangedEvent implements DomainEvent {
  public readonly occurredAt: Date = new Date();

  public constructor(
    public readonly userId: UnifiedIdVO,
    public readonly userName: UserNameVO,
    public readonly oldUserName: UserNameVO,
  ) {}
}
