import { UserAggregate } from './user.aggregate';
import { UnifiedIdVO, UserNameVO } from '../../value-objects/index';

export interface UserRepository {
  save(user: UserAggregate): Promise<void>;

  delete(userId: UnifiedIdVO): Promise<void>;

  findById(userId: UnifiedIdVO): Promise<UserAggregate | null>;

  findByIdAndTenantId(
    userId: UnifiedIdVO,
    tenantId: UnifiedIdVO,
  ): Promise<UserAggregate | null>;

  findUserIdsByDepartmentId(departmentId: UnifiedIdVO): Promise<UnifiedIdVO[]>;

  isUsernameUniqueInTenant(
    userName: UserNameVO,
    tenantId: UnifiedIdVO,
  ): Promise<boolean>;
}
