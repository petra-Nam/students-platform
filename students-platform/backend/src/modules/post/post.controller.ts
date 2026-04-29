import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../../shared/middleware/auth.middleware';
import { postService } from './post.service';
import { parseCursorParams } from './post.validation';
import { PostMapper } from './mappers';
import { POST_ERROR } from './post.constants';

class PostController {
  createPost = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Controller responsibility: Add auth context to request data
      const post = await postService.createPost({
        ...req.body,
        authorId: req.user!.id,
      });

      const safePost = PostMapper.toSafePost(post);

      return res.status(201).json({
        message: 'Post created successfully',
        post: safePost,
      });
    } catch (err: any) {
      if (err instanceof Error && err.message === POST_ERROR.CATEGORY_NOT_FOUND) {
        return res.status(404).json({
          message: 'Category not found or inactive'
        });
      }
      return next(err);
    }
  };

  getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { postId } = req.params;
      const incrementView = req.query.incrementView === 'true';

      const post = await postService.getPostById(postId);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      if (incrementView) {
        await postService.incrementViewCount(postId);
        post.viewCount += 1;
      }

      const safePost = PostMapper.toSafePost(post);

      return res.status(200).json({ post: safePost });
    } catch (err: any) {
      return next(err);
    }
  };

  updatePost = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { postId } = req.params;

      // Service handles all database checks (existence, ownership)
      const updatedPost = await postService.updatePost(postId, req.body, req.user!.id);

      const safePost = PostMapper.toSafePost(updatedPost!);

      return res.status(200).json({
        message: 'Post updated successfully',
        post: safePost,
      });
    } catch (err: any) {
      if (err instanceof Error) {
        switch (err.message) {
          case POST_ERROR.NOT_FOUND:
            return res.status(404).json({ message: 'Post not found' });
          case POST_ERROR.UNAUTHORIZED:
            return res.status(403).json({ message: 'You are not authorized to update this post' });
          case POST_ERROR.CATEGORY_NOT_FOUND:
            return res.status(404).json({ message: 'Category not found or inactive' });
        }
      }
      return next(err);
    }
  };

  getFeed = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { cursor, limit } = parseCursorParams(
        req.query.cursor as string,
        req.query.limit as string
      );

      const result = await postService.getFeed({ cursor, limit });

      return res.status(200).json(result);
    } catch (err: any) {
      return next(err);
    }
  };

  getPostsByCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { categoryId } = req.params;
      const { cursor, limit } = parseCursorParams(
        req.query.cursor as string,
        req.query.limit as string
      );

      const result = await postService.getPostsByCategory(categoryId, cursor, limit);

      return res.status(200).json(result);
    } catch (err: any) {
      return next(err);
    }
  };

  getPostsByAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { authorId } = req.params;
      const { cursor, limit } = parseCursorParams(
        req.query.cursor as string,
        req.query.limit as string
      );

      const result = await postService.getPostsByAuthor(authorId, cursor, limit);

      return res.status(200).json(result);
    } catch (err: any) {
      return next(err);
    }
  };

  getScoredFeed = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const limit = parseInt(req.query.limit as string || '10', 10);
      const preferredCategories = req.query.preferredCategories
        ? (req.query.preferredCategories as string).split(',')
        : [];

      const result = await postService.getScoredFeed({
        limit: !isNaN(limit) && limit > 0 ? limit : 10,
        preferredCategories
      });

      return res.status(200).json(result);
    } catch (err: any) {
      return next(err);
    }
  };
}

export const postController = new PostController();
