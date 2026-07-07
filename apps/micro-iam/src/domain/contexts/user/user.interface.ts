import {
  UserStatus,
  UserNameVO,
  UnifiedIdVO,
  UserStatusVO,
} from '../../value-objects/index';

export interface UserSnapshot {
  userId: string;
  userName: string;
  userStatus: UserStatus;
}

interface UserProp {
  userId: UnifiedIdVO;
  userName: UserNameVO;
  userStatus: UserStatusVO;
}

export type UserCreateProp = Omit<UserProp, 'userStatus'>;
export type UserHydrateProp = UserProp;
