export type UserStatus = 'Activated' | 'Freezed' | 'Abolished';

export class UserStatusVO {
  private constructor(private userStatus: UserStatus) {}

  public get value(): UserStatus {
    return this.userStatus;
  }
  public equals(other?: UserStatusVO): boolean {
    if (other === undefined) return false;
    if (this === other) return true;
    return this.userStatus === other.userStatus;
  }

  public isActivated(): boolean {
    return this.userStatus === 'Activated';
  }
  public isFreezed(): boolean {
    return this.userStatus === 'Freezed';
  }
  public isAbolished(): boolean {
    return this.userStatus === 'Abolished';
  }

  public static Activated(): UserStatusVO {
    return new UserStatusVO('Activated');
  }

  public static Freezed(): UserStatusVO {
    return new UserStatusVO('Freezed');
  }

  public static Abolished(): UserStatusVO {
    return new UserStatusVO('Abolished');
  }
}
