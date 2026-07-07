import {
  AggregateRoot,
  UserNameVO,
  UnifiedIdVO,
  UserStatusVO,
  type UserSnapshot,
  type UserCreateProp,
  type UserHydrateProp,
} from './user.import';
import {
  UserCreatedEvent,
  UserFreezedEvent,
  UserActivatedEvent,
  UserAbolishedEvent,
  UserNameChangedEvent,
} from './events/index';

export class UserAggregate extends AggregateRoot {
  private constructor(
    private readonly userId: UnifiedIdVO,
    private userName: UserNameVO,
    private userStatus: UserStatusVO = UserStatusVO.Activated(),
  ) {
    super();
  }

  public equals(userId: UnifiedIdVO): boolean {
    return this.userId.equals(userId);
  }

  public get snapshot(): UserSnapshot {
    return {
      userId: this.userId.value,
      userName: this.userName.value,
      userStatus: this.userStatus.value,
    };
  }

  private assertActivated(): void {
    if (!this.userStatus.isActivated()) throw new Error('非正常状态禁止操作');
  }
  private assertNotAbolished(): void {
    if (this.userStatus.isAbolished()) throw new Error('用户已不存在');
  }

  public active(): void {
    this.assertActivated();
    this.assertNotAbolished();

    const oldUserStatus = this.userStatus;
    this.userStatus = UserStatusVO.Activated();

    this.addDomainEvent(
      new UserActivatedEvent(this.userId, this.userStatus, oldUserStatus),
    );
  }
  public freeze(): void {
    this.assertActivated();
    this.assertNotAbolished();

    const oldUserStatus = this.userStatus;
    this.userStatus = UserStatusVO.Freezed();
    this.addDomainEvent(
      new UserFreezedEvent(this.userId, this.userStatus, oldUserStatus),
    );
  }
  public abolish(): void {
    this.assertActivated();

    const oldUserStatus = this.userStatus;
    this.userStatus = UserStatusVO.Abolished();
    this.addDomainEvent(
      new UserAbolishedEvent(this.userId, this.userStatus, oldUserStatus),
    );
  }

  public changeUserName(newUserName: UserNameVO): void {
    this.assertActivated();
    const oldUserName = this.userName;
    this.userName = newUserName;
    this.addDomainEvent(
      new UserNameChangedEvent(this.userId, this.userName, oldUserName),
    );
  }

  public static Create(prop: UserCreateProp): UserAggregate {
    const { userId, userName } = prop;
    const userStatus = UserStatusVO.Activated();
    const user = new UserAggregate(userId, userName, userStatus);

    user.addDomainEvent(new UserCreatedEvent(userId, userName, userStatus));
    return user;
  }
  public static Hydrate(snapshot: UserHydrateProp): UserAggregate {
    const { userId, userName, userStatus } = snapshot;
    return new UserAggregate(userId, userName, userStatus);
  }
}
