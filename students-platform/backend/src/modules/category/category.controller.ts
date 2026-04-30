import type { Request, Response, NextFunction } from 'express';
import { categoryService } from './category.service';
import { CATEGORY_ERROR } from './category.constants';
import { CategoryMapper } from './mappers';

type ErrorResponse = {
  status: number;
  message: string;
};

const CATEGORY_ERROR_RESPONSES: Record<string, ErrorResponse> = {
  [CATEGORY_ERROR.NOT_FOUND]: {
    status: 404,
    message: 'Category not found',
  },
  [CATEGORY_ERROR.SLUG_INVALID]: {
    status: 400,
    message: 'Invalid slug format. Use kebab-case (e.g., my-category)',
  },
  [CATEGORY_ERROR.NAME_EXISTS]: {
    status: 409,
    message: 'Category with this name already exists',
  },
  [CATEGORY_ERROR.SLUG_EXISTS]: {
    status: 409,
    message: 'Category with this slug already exists',
  },
  [CATEGORY_ERROR.IN_USE]: {
    status: 409,
    message: 'Cannot deactivate category that is used by posts',
  },
};

const sendCategoryError = (
  err: unknown,
  res: Response,
  next: NextFunction
) => {
  if (!(err instanceof Error)) {
    return next(err);
  }

  const errorResponse = CATEGORY_ERROR_RESPONSES[err.message];

  if (!errorResponse) {
    return next(err);
  }

  return res.status(errorResponse.status).json({
    message: errorResponse.message,
  });
};

class CategoryController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await categoryService.createCategory(req.body);
      const safeCategory = CategoryMapper.toSafeCategory(category);

      return res.status(201).json(safeCategory);
    } catch (err) {
      return sendCategoryError(err, res, next);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await categoryService.updateCategory(
        req.params.id,
        req.body
      );

      const safeCategory = CategoryMapper.toSafeCategory(category);

      return res.status(200).json(safeCategory);
    } catch (err) {
      return sendCategoryError(err, res, next);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      const safeCategory = CategoryMapper.toSafeCategory(category);

      return res.status(200).json(safeCategory);
    } catch (err) {
      return sendCategoryError(err, res, next);
    }
  };

  getBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await categoryService.getCategoryBySlug(req.params.slug);
      const safeCategory = CategoryMapper.toSafeCategory(category);

      return res.status(200).json(safeCategory);
    } catch (err) {
      return sendCategoryError(err, res, next);
    }
  };

  getActive = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoryService.getActiveCategories();
      const safeCategories = CategoryMapper.toSafeCategories(categories);

      return res.status(200).json(safeCategories);
    } catch (err) {
      return next(err);
    }
  };

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoryService.getAllCategories();
      const safeCategories = CategoryMapper.toSafeCategories(categories);

      return res.status(200).json(safeCategories);
    } catch (err) {
      return next(err);
    }
  };
}

export const categoryController = new CategoryController();