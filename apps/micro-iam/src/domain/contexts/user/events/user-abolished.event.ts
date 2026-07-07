import { DomainEvent, UnifiedIdVO, UserStatusVO } from '../user.import';

export class UserAbolishedEvent implements DomainEvent {
  public readonly occurredAt: Date = new Date();

  public constructor(
    public readonly userId: UnifiedIdVO,
    public readonly userStatus: UserStatusVO,
    public readonly oldUserStatus: UserStatusVO,
  ) {}
}
