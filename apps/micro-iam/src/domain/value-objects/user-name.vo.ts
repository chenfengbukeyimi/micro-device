export class UserNameVO {
  private constructor(private userName: string) {}

  public get value(): string {
    return this.userName;
  }
  public equals(other?: UserNameVO): boolean {
    if (other === undefined) return false;
    if (this === other) return true;
    return this.userName === other.userName;
  }

  private static ValidateValid(userName: string): void {
    userName = userName.trim();
    if (userName.length === 0 || userName === '')
      throw new Error('用户名称不能为空');
  }

  private static ValidateLength(userName: string): void {
    if (userName.length > 12) throw new Error('用户名称长度不能超过12个字符');
  }

  private static UserNameRule = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
  private static ValidateFormat(userName: string): void {
    if (!this.UserNameRule.test(userName))
      throw new Error('用户名称由中文、英文、数字、下划线等字符构成');
  }

  private static Validate(userName: string): void {
    this.ValidateValid(userName);
    this.ValidateLength(userName);
    this.ValidateFormat(userName);
  }

  public static Create(userName: string): UserNameVO {
    this.Validate(userName);
    return new UserNameVO(userName);
  }
}
