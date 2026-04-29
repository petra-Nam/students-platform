import type { Request, Response, NextFunction } from 'express';
import { categoryService } from './category.service';
import { CATEGORY_ERROR } from './category.constants';
import { CategoryMapper } from './mappers';

class CategoryController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await categoryService.createCategory(req.body);
      const safeCategory = CategoryMapper.toSafeCategory(category);
      return res.status(201).json(safeCategory);
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case CATEGORY_ERROR.SLUG_INVALID:
            return res.status(400).json({ message: 'Invalid slug format. Use kebab-case (e.g., my-category)' });
          case CATEGORY_ERROR.NAME_EXISTS:
            return res.status(409).json({ message: 'Category with this name already exists' });
          case CATEGORY_ERROR.SLUG_EXISTS:
            return res.status(409).json({ message: 'Category with this slug already exists' });
        }
      }
      return next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const category = await categoryService.updateCategory(id, req.body);
      const safeCategory = CategoryMapper.toSafeCategory(category);
      return res.status(200).json(safeCategory);
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case CATEGORY_ERROR.NOT_FOUND:
            return res.status(404).json({ message: 'Category not found' });
          case CATEGORY_ERROR.SLUG_INVALID:
            return res.status(400).json({ message: 'Invalid slug format. Use kebab-case (e.g., my-category)' });
          case CATEGORY_ERROR.NAME_EXISTS:
            return res.status(409).json({ message: 'Category with this name already exists' });
          case CATEGORY_ERROR.SLUG_EXISTS:
            return res.status(409).json({ message: 'Category with this slug already exists' });
          case CATEGORY_ERROR.IN_USE:
            return res.status(409).json({ message: 'Cannot deactivate category that is used by posts' });
        }
      }
      return next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryById(id);
      const safeCategory = CategoryMapper.toSafeCategory(category);
      return res.status(200).json(safeCategory);
    } catch (err) {
      if (err instanceof Error && err.message === CATEGORY_ERROR.NOT_FOUND) {
        return res.status(404).json({ message: 'Category not found' });
      }
      return next(err);
    }
  };

  getBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      const category = await categoryService.getCategoryBySlug(slug);
      const safeCategory = CategoryMapper.toSafeCategory(category);
      return res.status(200).json(safeCategory);
    } catch (err) {
      if (err instanceof Error && err.message === CATEGORY_ERROR.NOT_FOUND) {
        return res.status(404).json({ message: 'Category not found' });
      }
      return next(err);
    }
  };

  getActive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoryService.getActiveCategories();
      const safeCategories = CategoryMapper.toSafeCategories(categories);
      return res.status(200).json(safeCategories);
    } catch (err) {
      return next(err);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
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
