import {
  DomainEvent,
  UnifiedIdVO,
  UserNameVO,
  UserStatusVO,
} from '../user.import';

export class UserCreatedEvent implements DomainEvent {
  public readonly occurredAt: Date = new Date();

  public constructor(
    public readonly userId: UnifiedIdVO,
    public readonly userName: UserNameVO,
    public readonly userStatus: UserStatusVO,
  ) {}
}
