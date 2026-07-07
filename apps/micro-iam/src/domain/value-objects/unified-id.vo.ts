export class UnifiedIdVO {
  private constructor(private unifiedId: string) {}

  public get value(): string {
    return this.unifiedId;
  }
  public equals(other?: UnifiedIdVO): boolean {
    if (other === undefined) return false;
    if (this === other) return true;
    return this.unifiedId === other.unifiedId;
  }

  private static ValidateLength(unifiedId: string): void {
    if (unifiedId.length !== 36) throw new Error('Invalid unifiedId length');
  }

  private static UUID7Rule =
    /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  private static ValidateFormat(unifiedId: string): void {
    if (!this.UUID7Rule.test(unifiedId))
      throw new Error('Invalid unifiedId format');
  }

  private static Validate(unifiedId: string): void {
    this.ValidateLength(unifiedId);
    this.ValidateFormat(unifiedId);
  }

  public static Create(unifiedId: string): UnifiedIdVO {
    this.Validate(unifiedId);
    return new UnifiedIdVO(unifiedId);
  }
}
