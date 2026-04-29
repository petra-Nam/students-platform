import { Router } from 'express';
import { likeController } from './like.controller';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import {
  validateCreateLike,
  validateLikeableIdParam,
  validateLikeableTypeParam
} from './like.validation';

const router = Router();

router.post('/', authMiddleware, validateCreateLike, likeController.like);

router.delete(
  '/:likeableType/:likeableId',
  authMiddleware,
  validateLikeableTypeParam,
  validateLikeableIdParam,
  likeController.unlike
);

router.get(
  '/:likeableType/:likeableId/status',
  authMiddleware,
  validateLikeableTypeParam,
  validateLikeableIdParam,
  likeController.checkLikeStatus
);

router.get(
  '/:likeableType/:likeableId',
  validateLikeableTypeParam,
  validateLikeableIdParam,
  likeController.getLikesByEntity
);

router.get('/user/me', authMiddleware, likeController.getUserLikes);

export default router;
