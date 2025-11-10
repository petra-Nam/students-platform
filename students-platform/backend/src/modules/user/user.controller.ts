import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userService } from './user.service';
import type { UserDoc } from './user.model';
import { env } from '../../config/env';

const JWT_SECRET = env.JWT_SECRET || 'changeme';
const JWT_EXPIRES_IN = env.JWT_EXPIRES_IN || '7d';

interface RegisterBody {
  type: string;
  name: string;
  username: string;
  email: string;
  password: string;
}



class UserController {
  private createToken(user: UserDoc): string {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      type: user.type,
      provider: user.provider,
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }


  register = async (
    req: Request<unknown, unknown, RegisterBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { type, name, username, email, password } = req.body;

      if (!name || !username || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const user = await userService.registerLocal({
        type: type as any,
        name,
        username,
        email,
        password,
      });

      const token = this.createToken(user);
      const safeUser = userService.toSafeUser(user);

      return res.status(201).json({ user: safeUser, token });
    } catch (err: any) {
      if (err.message === 'EMAIL_ALREADY_EXISTS') {
        return res.status(409).json({ message: 'Email already in use' });
      }
      if (err.message === 'USERNAME_ALREADY_EXISTS') {
        return res.status(409).json({ message: 'Username already in use' });
      }
      return next(err);
    }
  };

}

export const userController = new UserController();
