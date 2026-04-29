import { body, param } from 'express-validator';
import { handleValidationErrors } from '../../shared/middleware/validation.middleware';
import { POST_STATUS, POST_VISIBILITY } from '../../shared/constants';
import { POST_VALIDATION } from './post.constants';

const VALID_STATUSES = Object.values(POST_STATUS);
const VALID_VISIBILITIES = Object.values(POST_VISIBILITY);

export const parseCursorParams = (cursorParam?: string, limitParam?: string): { cursor?: string; limit: number } => {
  const limit = parseInt(limitParam || '10', 10);
  const isValidObjectId = (id?: string) => !!id && /^[0-9a-fA-F]{24}$/.test(id);

  return {
    cursor: cursorParam && isValidObjectId(cursorParam) ? cursorParam : undefined,
    limit: !isNaN(limit) && limit > 0 && limit <= POST_VALIDATION.MAX_PAGINATION_LIMIT ? limit : 10
  };
};

const validateContent = () =>
  body('content')
    .notEmpty().withMessage('Content is required')
    .custom((value) => {
      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (trimmed.length === 0 || trimmed.length > POST_VALIDATION.CONTENT_MAX_LENGTH) {
          throw new Error(`Content must not exceed ${POST_VALIDATION.CONTENT_MAX_LENGTH} characters`);
        }
      } else if (typeof value === 'object') {
        const plainText = JSON.stringify(value);
        if (plainText.length === 0 || plainText.length > POST_VALIDATION.CONTENT_MAX_LENGTH) {
          throw new Error(`Content must not exceed ${POST_VALIDATION.CONTENT_MAX_LENGTH} characters`);
        }
      } else {
        throw new Error('Content must be a string or object');
      }
      return true;
    });

const validateImages = () =>
  body('images')
    .optional()
    .isArray().withMessage('Images must be an array')
    .custom((images) => {
      if (images.length > POST_VALIDATION.MAX_IMAGES) {
        throw new Error(`Maximum ${POST_VALIDATION.MAX_IMAGES} images allowed`);
      }
      for (const img of images) {
        if (!img.url || typeof img.url !== 'string') {
          throw new Error('Each image must have a valid URL');
        }
        try {
          new URL(img.url);
        } catch {
          throw new Error('Each image must have a valid URL');
        }
        if (img.alt && typeof img.alt === 'string' && img.alt.length > POST_VALIDATION.ALT_TEXT_MAX_LENGTH) {
          throw new Error(`Image alt text must not exceed ${POST_VALIDATION.ALT_TEXT_MAX_LENGTH} characters`);
        }
      }
      return true;
    });

export const validateCreatePost = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: POST_VALIDATION.TITLE_MIN_LENGTH, max: POST_VALIDATION.TITLE_MAX_LENGTH })
    .withMessage(`Title must be between ${POST_VALIDATION.TITLE_MIN_LENGTH} and ${POST_VALIDATION.TITLE_MAX_LENGTH} characters`),
  validateContent(),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Invalid category ID'),
  body('status')
    .optional()
    .isIn(VALID_STATUSES).withMessage(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`),
  body('visibility')
    .optional()
    .isIn(VALID_VISIBILITIES).withMessage(`Invalid visibility. Must be one of: ${VALID_VISIBILITIES.join(', ')}`),
  validateImages(),
  handleValidationErrors,
];

export const validateUpdatePost = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: POST_VALIDATION.TITLE_MIN_LENGTH, max: POST_VALIDATION.TITLE_MAX_LENGTH })
    .withMessage(`Title must be between ${POST_VALIDATION.TITLE_MIN_LENGTH} and ${POST_VALIDATION.TITLE_MAX_LENGTH} characters`),
  validateContent(),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Invalid category ID'),
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(VALID_STATUSES).withMessage(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`),
  body('visibility')
    .notEmpty().withMessage('Visibility is required')
    .isIn(VALID_VISIBILITIES).withMessage(`Invalid visibility. Must be one of: ${VALID_VISIBILITIES.join(', ')}`),
  validateImages(),
  handleValidationErrors,
];

export const validatePostId = [
  param('postId').isMongoId().withMessage('Invalid post ID'),
  handleValidationErrors,
];

export const validateCategoryIdParam = [
  param('categoryId').isMongoId().withMessage('Invalid category ID'),
  handleValidationErrors,
];

export const validateAuthorId = [
  param('authorId').isMongoId().withMessage('Invalid author ID'),
  handleValidationErrors,
];
