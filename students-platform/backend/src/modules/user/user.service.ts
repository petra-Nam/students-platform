import { User, type UserDoc } from './user.model';
import type { UserType } from '@/shared/types/domain';

export interface RegisterDTO {
  type: UserType;       // 'Student' | 'StudySeeker' | 'Admin'
  name: string;
  username: string;
  email: string;
  password: string;
}


export type SafeUser = {
  id: string;
  type: UserType;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  isVerified: boolean;
};

export class UserService {
  async registerLocal(data: RegisterDTO): Promise<UserDoc> {
    const existingEmail = await User.findByEmail(data.email);
    if (existingEmail) {
      throw new Error('EMAIL_ALREADY_EXISTS');
    }

    const existingUsername = await User.findOne({
      username: data.username.toLowerCase(),
    });
    if (existingUsername) {
      throw new Error('USERNAME_ALREADY_EXISTS');
    }

    const user = new User({
      ...data,
      provider: 'local',
      email: data.email.toLowerCase(),
      username: data.username.toLowerCase(),
    });

    // password is hashed by pre('save') hook
    return user.save();
  }



  toSafeUser(user: UserDoc): SafeUser {
    return {
      id: user._id.toString(),
      type: user.type as UserType,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      location: user.location,
      isVerified: user.isVerified,
    };
  }
}

export const userService = new UserService();
