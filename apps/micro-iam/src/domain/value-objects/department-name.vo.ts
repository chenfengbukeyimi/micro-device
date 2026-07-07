export class DepartmentNameVO {
  private constructor(private departmentName: string) {}

  public get value(): string {
    return this.departmentName;
  }
  public equals(other?: DepartmentNameVO): boolean {
    if (other === undefined) return false;
    if (this === other) return true;
    return this.departmentName === other.departmentName;
  }

  private static ValidateValid(departmentName: string): void {
    departmentName = departmentName.trim();
    if (departmentName.length === 0 || departmentName === '')
      throw new Error('部门名称不能为空');
  }

  private static ValidateLength(departmentName: string): void {
    if (departmentName.length > 12)
      throw new Error('部门名称长度不能超过12个字符');
  }

  private static UserNameRule = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
  private static ValidateFormat(departmentName: string): void {
    if (!this.UserNameRule.test(departmentName))
      throw new Error('部门名称由中文、英文、数字、下划线等字符构成');
  }

  private static Validate(departmentName: string): void {
    this.ValidateValid(departmentName);
    this.ValidateLength(departmentName);
    this.ValidateFormat(departmentName);
  }

  public static Create(departmentName: string): DepartmentNameVO {
    this.Validate(departmentName);
    return new DepartmentNameVO(departmentName);
  }
}
