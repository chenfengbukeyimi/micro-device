export type DepartmentStatus = 'Activated' | 'Freezed' | 'Abolished';

export class DepartmentStatusVO {
  private constructor(private departmentStatus: DepartmentStatus) {}

  public get value(): DepartmentStatus {
    return this.departmentStatus;
  }
  public equals(other?: DepartmentStatusVO): boolean {
    if (other === undefined) return false;
    if (this === other) return true;
    return this.departmentStatus === other.departmentStatus;
  }

  public isActivated(): boolean {
    return this.departmentStatus === 'Activated';
  }
  public isFreezed(): boolean {
    return this.departmentStatus === 'Freezed';
  }
  public isAbolished(): boolean {
    return this.departmentStatus === 'Abolished';
  }

  public static Activated(): DepartmentStatusVO {
    return new DepartmentStatusVO('Activated');
  }

  public static Freezed(): DepartmentStatusVO {
    return new DepartmentStatusVO('Freezed');
  }

  public static Abolished(): DepartmentStatusVO {
    return new DepartmentStatusVO('Abolished');
  }
}
