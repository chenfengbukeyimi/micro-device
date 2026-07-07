import {
  UnifiedIdVO,
  DepartmentNameVO,
  DepartmentStatusVO,
  type DepartmentSnapshot,
  type DepartmentCreateProp,
  type DepartmentHydrateProp,
} from './department.import';

export class DepartmentEntity {
  private constructor(
    private readonly departmentId: UnifiedIdVO,
    private departmentName: DepartmentNameVO,
    private departmentStatus: DepartmentStatusVO,
    private parentDepartmentId: UnifiedIdVO | null = null,
    private userIds: UnifiedIdVO[] = [],
  ) {}

  public get snapshot(): DepartmentSnapshot {
    return {
      departmentId: this.departmentId.value,
      departmentName: this.departmentName.value,
      departmentStatus: this.departmentStatus.value,
      parentDepartmentId: this.parentDepartmentId?.value ?? null,
    };
  }

  public equals(departmentId: UnifiedIdVO): boolean {
    return this.departmentId.equals(departmentId);
  }

  public assertActivated(): void {
    if (!this.departmentStatus.isActivated())
      throw new Error('非正常状态禁止操作');
  }

  private assertNotAbolished(): void {
    if (this.departmentStatus.isAbolished()) throw new Error('部门已不存在');
  }

  public active(): void {
    this.assertActivated();
    this.assertNotAbolished();

    this.departmentStatus = DepartmentStatusVO.Activated();
  }
  public freeze(): void {
    this.assertActivated();
    this.assertNotAbolished();

    this.departmentStatus = DepartmentStatusVO.Freezed();
  }
  public abolish(): void {
    this.assertActivated();

    this.departmentStatus = DepartmentStatusVO.Abolished();
  }

  public changeName(newDepartmentName: DepartmentNameVO): void {
    this.assertActivated();

    this.departmentName = newDepartmentName;
  }

  public moveTo(parentDepartmentId: UnifiedIdVO | null): void {
    this.assertActivated();
    this.parentDepartmentId = parentDepartmentId;
  }

  public static Create(props: DepartmentCreateProp): DepartmentEntity {
    const { departmentId, departmentName, parentDepartmentId } = props;
    const departmentStatus = DepartmentStatusVO.Activated();
    return new DepartmentEntity(
      departmentId,
      departmentName,
      departmentStatus,
      parentDepartmentId,
    );
  }

  public static Hydrate(props: DepartmentHydrateProp): DepartmentEntity {
    const {
      departmentId,
      departmentName,
      departmentStatus,
      parentDepartmentId,
    } = props;
    return new DepartmentEntity(
      departmentId,
      departmentName,
      departmentStatus,
      parentDepartmentId,
    );
  }

  private assertUserExist(userId: UnifiedIdVO): void {
    if (!this.userIds.includes(userId)) throw new Error('用户不存在');
  }

  private assertUserNotExist(userId: UnifiedIdVO): void {
    if (this.userIds.includes(userId)) throw new Error('用户已存在');
  }

  public addUser(userId: UnifiedIdVO): void {
    this.assertActivated();
    this.assertUserNotExist(userId);

    this.userIds.push(userId);
  }

  public removeUser(userId: UnifiedIdVO): void {
    this.assertActivated();
    this.assertUserExist(userId);

    this.userIds = this.userIds.filter((id) => id !== userId);
  }
}
