export class TenantNameVO {
  private constructor(private tenantName: string) {}

  public get value(): string {
    return this.tenantName;
  }
  public equals(other?: TenantNameVO): boolean {
    if (other === undefined) return false;
    if (this === other) return true;
    return this.tenantName === other.tenantName;
  }

  private static ValidateValid(tenantName: string): void {
    tenantName = tenantName.trim();
    if (tenantName.length === 0 || tenantName === '')
      throw new Error('租户名称不能为空');
  }

  private static ValidateLength(tenantName: string): void {
    if (tenantName.length > 12) throw new Error('租户名称长度不能超过12个字符');
  }

  private static UserNameRule = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
  private static ValidateFormat(tenantName: string): void {
    if (!this.UserNameRule.test(tenantName))
      throw new Error('租户名称由中文、英文、数字、下划线等字符构成');
  }

  private static Validate(tenantName: string): void {
    this.ValidateValid(tenantName);
    this.ValidateLength(tenantName);
    this.ValidateFormat(tenantName);
  }

  public static Create(tenantName: string): TenantNameVO {
    this.Validate(tenantName);
    return new TenantNameVO(tenantName);
  }
}
