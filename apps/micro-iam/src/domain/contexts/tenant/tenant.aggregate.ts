import {
  AggregateRoot,
  UnifiedIdVO,
  TenantNameVO,
  TenantStatusVO,
  DepartmentEntity,
  type TenantSnapshot,
  type TenantCreateProp,
  type TenantHydrateProp,
} from './tenant.import';
import {
  DepartmentNameVO,
  DepartmentStatusVO,
  type DepartmentStatus,
} from './department/department.import';
import {
  TenantCreatedEvent,
  TenantActivatedEvent,
  TenantFreezedEvent,
  TenantAbolishedEvent,
  TenantNameChangedEvent,
  DepartmentCreatedEvent,
  DepartmentDeletedEvent,
  DepartmentMovedEvent,
  DepartmentNameChangedEvent,
  UserAssignedToDepartmentEvent,
  UserRemovedFromDepartmentEvent,
} from './events/index';

export class TenantAggregate extends AggregateRoot {
  private constructor(
    private readonly tenantId: UnifiedIdVO,
    private tenantName: TenantNameVO,
    private tenantStatus: TenantStatusVO,
    private departments: DepartmentEntity[] = [],
  ) {
    super();
  }

  public equals(tenantId: UnifiedIdVO): boolean {
    return this.tenantId.equals(tenantId);
  }

  public get snapshot(): TenantSnapshot {
    return {
      tenantId: this.tenantId.value,
      tenantName: this.tenantName.value,
      tenantStatus: this.tenantStatus.value,
      departments: this.departments.map((department) => department.snapshot),
    };
  }

  private assertActivated(): void {
    if (!this.tenantStatus.isActivated()) throw new Error('非正常状态禁止操作');
  }
  private assertNotAbolished(): void {
    if (this.tenantStatus.isAbolished()) throw new Error('租户已不存在');
  }

  public active(): void {
    this.assertActivated();
    this.assertNotAbolished();

    const oldTenantStatus = this.tenantStatus;
    this.tenantStatus = TenantStatusVO.Activated();

    this.addDomainEvent(
      new TenantActivatedEvent(
        this.tenantId,
        this.tenantStatus,
        oldTenantStatus,
      ),
    );
  }
  public freeze(): void {
    this.assertActivated();
    this.assertNotAbolished();

    const oldTenantStatus = this.tenantStatus;
    this.tenantStatus = TenantStatusVO.Freezed();

    this.addDomainEvent(
      new TenantFreezedEvent(this.tenantId, this.tenantStatus, oldTenantStatus),
    );
  }
  public abolish(): void {
    this.assertActivated();

    const oldTenantStatus = this.tenantStatus;
    this.tenantStatus = TenantStatusVO.Abolished();

    this.addDomainEvent(
      new TenantAbolishedEvent(
        this.tenantId,
        this.tenantStatus,
        oldTenantStatus,
      ),
    );
  }

  public changeName(newTenantName: TenantNameVO): void {
    this.assertActivated();

    const oldTenantName = this.tenantName;
    this.tenantName = newTenantName;
    this.addDomainEvent(
      new TenantNameChangedEvent(this.tenantId, this.tenantName, oldTenantName),
    );
  }

  public static Create(prop: TenantCreateProp): TenantAggregate {
    const { tenantId, tenantName, departments } = prop;
    const tenantStatus = TenantStatusVO.Activated();
    const tenant = new TenantAggregate(
      tenantId,
      tenantName,
      tenantStatus,
      departments,
    );

    tenant.addDomainEvent(
      new TenantCreatedEvent(tenantId, tenantName, tenantStatus, []),
    );

    return tenant;
  }

  public static Hydrate(prop: TenantHydrateProp): TenantAggregate {
    const { tenantId, tenantName, tenantStatus, departments } = prop;
    return new TenantAggregate(tenantId, tenantName, tenantStatus, departments);
  }

  private findDepartmentById(
    departmentId: UnifiedIdVO | null,
  ): DepartmentEntity | null {
    if (!departmentId) return null;
    return this.departments.find((d) => d.equals(departmentId)) ?? null;
  }

  private assertDepartmentExistById(
    departmentId: UnifiedIdVO,
  ): DepartmentEntity {
    const current = this.findDepartmentById(departmentId);
    if (!current) throw new Error('部门不存在');
    return current;
  }

  private assertDepartmentNotExistById(departmentId: UnifiedIdVO): void {
    const current = this.findDepartmentById(departmentId);
    if (current) throw new Error('部门已存在');
  }

  private assertDepartmentNotCreateCycle(
    department: DepartmentEntity,
    parentDepartment: DepartmentEntity,
  ): void {
    const departmentId = UnifiedIdVO.Create(department.snapshot.departmentId);
    const parentDepartmentId = UnifiedIdVO.Create(
      parentDepartment.snapshot.departmentId,
    );
    if (departmentId.equals(parentDepartmentId)) return;

    let parent: DepartmentEntity | null = parentDepartment;

    while (parent) {
      const parentId = UnifiedIdVO.Create(parent.snapshot.departmentId);
      if (parent.equals(departmentId))
        throw new Error('部门移动不能禁止循环嵌套');

      if (!parent) break;
      parent = this.findDepartmentById(parentId);
    }
  }

  public createDepartment(department: DepartmentEntity): void {
    this.assertActivated();

    const departmentId = UnifiedIdVO.Create(department.snapshot.departmentId);

    this.assertDepartmentNotExistById(departmentId);

    this.departments.push(department);

    const departmentName = DepartmentNameVO.Create(
      department.snapshot.departmentName,
    );
    const statusKey = department.snapshot.departmentStatus as DepartmentStatus;
    const departmentStatus = DepartmentStatusVO[statusKey]();

    this.addDomainEvent(
      new DepartmentCreatedEvent(
        this.tenantId,
        departmentId,
        departmentName,
        departmentStatus,
      ),
    );
  }

  public deleteDepartment(departmentId: UnifiedIdVO): void {
    this.assertActivated();
    const current = this.assertDepartmentExistById(departmentId);

    this.departments = this.departments.filter((d) => d !== current);
    this.addDomainEvent(
      new DepartmentDeletedEvent(this.tenantId, departmentId),
    );
  }

  public moveDepartment(
    departmentId: UnifiedIdVO,
    parentDepartmentId: UnifiedIdVO | null,
  ): void {
    this.assertActivated();

    const department = this.assertDepartmentExistById(departmentId);
    const oldParentDepartmentId = department.snapshot.parentDepartmentId
      ? UnifiedIdVO.Create(department.snapshot.parentDepartmentId)
      : null;

    if (parentDepartmentId) {
      const parentDepartment = this.findDepartmentById(parentDepartmentId);
      this.assertDepartmentNotCreateCycle(department, parentDepartment!);
    }

    department.moveTo(parentDepartmentId);
    this.addDomainEvent(
      new DepartmentMovedEvent(
        this.tenantId,
        departmentId,
        parentDepartmentId,
        oldParentDepartmentId,
      ),
    );
  }

  public changeDepartmentName(
    departmentId: UnifiedIdVO,
    departmentName: DepartmentNameVO,
  ): void {
    this.assertActivated();

    const current = this.assertDepartmentExistById(departmentId);
    const oldDepartmentName = DepartmentNameVO.Create(
      current.snapshot.departmentName,
    );

    current.changeName(departmentName);
    this.addDomainEvent(
      new DepartmentNameChangedEvent(
        this.tenantId,
        departmentId,
        departmentName,
        oldDepartmentName,
      ),
    );
  }

  public addUserToDepartment(
    departmentId: UnifiedIdVO,
    userId: UnifiedIdVO,
  ): void {
    this.assertActivated();
    const department = this.assertDepartmentExistById(departmentId);

    department.addUser(userId);
    this.addDomainEvent(
      new UserAssignedToDepartmentEvent(this.tenantId, departmentId, userId),
    );
  }

  public deleteUserFromDepartment(
    departmentId: UnifiedIdVO,
    userId: UnifiedIdVO,
  ): void {
    this.assertActivated();
    const department = this.assertDepartmentExistById(departmentId);

    department.removeUser(userId);
    this.addDomainEvent(
      new UserRemovedFromDepartmentEvent(this.tenantId, departmentId, userId),
    );
  }

  public transferUserInDepartment(
    fromDepartmentId: UnifiedIdVO,
    toDepartmentId: UnifiedIdVO,
    userId: UnifiedIdVO,
  ): void {
    this.deleteUserFromDepartment(fromDepartmentId, userId);
    this.addUserToDepartment(toDepartmentId, userId);
  }
}
