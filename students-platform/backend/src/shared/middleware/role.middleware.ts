import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from './auth.middleware';
import { USER_TYPES } from '../types/domain';

export const requireAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.user.type !== USER_TYPES[2]) {
    return res.status(403).json({ message: 'Admin access required' });
  }

  next();
};
