import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../../shared/middleware/auth.middleware';
import { postService } from './post.service';
import { parseCursorParams } from './post.validation';
import { PostMapper } from './mappers';
import { POST_ERROR } from './post.constants';

type ErrorResponse = {
  status: number;
  message: string;
};

const POST_ERROR_RESPONSES: Record<string, ErrorResponse> = {
  [POST_ERROR.NOT_FOUND]: {
    status: 404,
    message: 'Post not found',
  },
  [POST_ERROR.UNAUTHORIZED]: {
    status: 403,
    message: 'You are not authorized to update this post',
  },
  [POST_ERROR.CATEGORY_NOT_FOUND]: {
    status: 404,
    message: 'Category not found or inactive',
  },
};

const handlePostError = (
  err: unknown,
  res: Response,
  next: NextFunction
) => {
  if (!(err instanceof Error)) {
    return next(err);
  }

  const errorResponse = POST_ERROR_RESPONSES[err.message];

  if (!errorResponse) {
    return next(err);
  }

  return res.status(errorResponse.status).json({
    message: errorResponse.message,
  });
};

const getPaginationParams = (req: Request) =>
  parseCursorParams(
    req.query.cursor as string,
    req.query.limit as string
  );

const getSafeLimit = (limitQuery?: string) => {
  const limit = parseInt(limitQuery || '10', 10);

  return Number.isNaN(limit) || limit <= 0 ? 10 : limit;
};

const getPreferredCategories = (preferredCategories?: string) =>
  preferredCategories ? preferredCategories.split(',') : [];

const sendPostResponse = (
  res: Response,
  status: number,
  message: string,
  post: any
) =>
  res.status(status).json({
    message,
    post: PostMapper.toSafePost(post),
  });

class PostController {
  createPost = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const post = await postService.createPost({
        ...req.body,
        authorId: req.user!.id,
      });

      return sendPostResponse(
        res,
        201,
        'Post created successfully',
        post
      );
    } catch (err: unknown) {
      return handlePostError(err, res, next);
    }
  };

  getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { postId } = req.params;
      const post = await postService.getPostById(postId);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      await this.updateViewCountIfRequested(req, postId, post);

      return res.status(200).json({
        post: PostMapper.toSafePost(post),
      });
    } catch (err: unknown) {
      return next(err);
    }
  };

  updatePost = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updatedPost = await postService.updatePost(
        req.params.postId,
        req.body,
        req.user!.id
      );

      return sendPostResponse(
        res,
        200,
        'Post updated successfully',
        updatedPost
      );
    } catch (err: unknown) {
      return handlePostError(err, res, next);
    }
  };

  getFeed = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { cursor, limit } = getPaginationParams(req);
      const result = await postService.getFeed({ cursor, limit });

      return res.status(200).json(result);
    } catch (err: unknown) {
      return next(err);
    }
  };

  getPostsByCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { cursor, limit } = getPaginationParams(req);
      const result = await postService.getPostsByCategory(
        req.params.categoryId,
        cursor,
        limit
      );

      return res.status(200).json(result);
    } catch (err: unknown) {
      return next(err);
    }
  };

  getPostsByAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { cursor, limit } = getPaginationParams(req);
      const result = await postService.getPostsByAuthor(
        req.params.authorId,
        cursor,
        limit
      );

      return res.status(200).json(result);
    } catch (err: unknown) {
      return next(err);
    }
  };

  getScoredFeed = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await postService.getScoredFeed({
        limit: getSafeLimit(req.query.limit as string),
        preferredCategories: getPreferredCategories(
          req.query.preferredCategories as string
        ),
      });

      return res.status(200).json(result);
    } catch (err: unknown) {
      return next(err);
    }
  };

  private updateViewCountIfRequested = async (
    req: Request,
    postId: string,
    post: any
  ) => {
    if (req.query.incrementView !== 'true') return;

    await postService.incrementViewCount(postId);
    post.viewCount += 1;
  };
}

export const postController = new PostController();