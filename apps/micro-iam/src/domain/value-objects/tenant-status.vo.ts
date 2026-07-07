export type TenantStatus = 'Activated' | 'Freezed' | 'Abolished';

export class TenantStatusVO {
  private constructor(private tenantStatus: TenantStatus) {}

  public get value(): TenantStatus {
    return this.tenantStatus;
  }
  public equals(other?: TenantStatusVO): boolean {
    if (other === undefined) return false;
    if (this === other) return true;
    return this.tenantStatus === other.tenantStatus;
  }

  public isActivated(): boolean {
    return this.tenantStatus === 'Activated';
  }
  public isFreezed(): boolean {
    return this.tenantStatus === 'Freezed';
  }
  public isAbolished(): boolean {
    return this.tenantStatus === 'Abolished';
  }

  public static Activated(): TenantStatusVO {
    return new TenantStatusVO('Activated');
  }

  public static Freezed(): TenantStatusVO {
    return new TenantStatusVO('Freezed');
  }

  public static Abolished(): TenantStatusVO {
    return new TenantStatusVO('Abolished');
  }
}
