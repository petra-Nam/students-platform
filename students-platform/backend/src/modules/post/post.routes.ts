import { Router } from 'express';
import { postController } from './post.controller';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import {
  validateCreatePost,
  validateUpdatePost,
  validatePostId,
  validateCategoryIdParam,
  validateAuthorId,
} from './post.validation';

const router = Router();

// Public routes

// Get feed with cursor pagination (public posts only)
router.get('/feed', postController.getFeed);

// Get scored feed with algorithm
router.get('/feed/scored', postController.getScoredFeed);

// Get posts by category
router.get(
  '/category/:categoryId',
  validateCategoryIdParam,
  postController.getPostsByCategory
);

// Get posts by author
router.get(
  '/author/:authorId',
  validateAuthorId,
  postController.getPostsByAuthor
);

// Get post by ID (must be last to avoid route conflicts)
router.get(
  '/:postId',
  validatePostId,
  postController.getPostById
);

// Protected routes (require authentication)

// Create post
router.post(
  '/',
  authMiddleware,
  validateCreatePost,
  postController.createPost
);

// Update post
router.put(
  '/:postId',
  authMiddleware,
  validatePostId,
  validateUpdatePost,
  postController.updatePost
);

export default router;
