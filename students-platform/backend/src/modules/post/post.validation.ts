import { body, param } from 'express-validator';
import { handleValidationErrors } from '../../shared/middleware/validation.middleware';
import { POST_STATUS, POST_VISIBILITY } from '../../shared/constants';
import { POST_VALIDATION } from './post.constants';

const VALID_STATUSES = Object.values(POST_STATUS);
const VALID_VISIBILITIES = Object.values(POST_VISIBILITY);

const CONTENT_LENGTH_ERROR = `Content must not exceed ${POST_VALIDATION.CONTENT_MAX_LENGTH} characters`;
const ALT_TEXT_LENGTH_ERROR = `Image alt text must not exceed ${POST_VALIDATION.ALT_TEXT_MAX_LENGTH} characters`;

export const parseCursorParams = (
  cursorParam?: string,
  limitParam?: string
): { cursor?: string; limit: number } => {
  const limit = parseInt(limitParam || '10', 10);

  return {
    cursor: isValidObjectId(cursorParam) ? cursorParam : undefined,
    limit: isValidLimit(limit) ? limit : 10,
  };
};

const isValidObjectId = (id?: string) =>
  Boolean(id && /^[0-9a-fA-F]{24}$/.test(id));

const isValidLimit = (limit: number) =>
  !Number.isNaN(limit) &&
  limit > 0 &&
  limit <= POST_VALIDATION.MAX_PAGINATION_LIMIT;

const getContentLength = (value: unknown): number => {
  if (typeof value === 'string') {
    return value.trim().length;
  }

  if (isRecord(value)) {
    return JSON.stringify(value).length;
  }

  throw new Error('Content must be a string or object');
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const validateContentLength = (value: unknown) => {
  const length = getContentLength(value);

  if (length === 0 || length > POST_VALIDATION.CONTENT_MAX_LENGTH) {
    throw new Error(CONTENT_LENGTH_ERROR);
  }

  return true;
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const hasValidImageUrl = (image: any) =>
  Boolean(image?.url && typeof image.url === 'string' && isValidUrl(image.url));

const hasValidAltText = (image: any) =>
  !image?.alt ||
  typeof image.alt !== 'string' ||
  image.alt.length <= POST_VALIDATION.ALT_TEXT_MAX_LENGTH;

const validateImage = (image: any) => {
  if (!hasValidImageUrl(image)) {
    throw new Error('Each image must have a valid URL');
  }

  if (!hasValidAltText(image)) {
    throw new Error(ALT_TEXT_LENGTH_ERROR);
  }

  return true;
};

const validateImageList = (images: any[]) => {
  if (images.length > POST_VALIDATION.MAX_IMAGES) {
    throw new Error(`Maximum ${POST_VALIDATION.MAX_IMAGES} images allowed`);
  }

  images.forEach(validateImage);

  return true;
};

const validateContent = () =>
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .custom(validateContentLength);

const validateImages = () =>
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array')
    .custom(validateImageList);

const validateTitle = () =>
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({
      min: POST_VALIDATION.TITLE_MIN_LENGTH,
      max: POST_VALIDATION.TITLE_MAX_LENGTH,
    })
    .withMessage(
      `Title must be between ${POST_VALIDATION.TITLE_MIN_LENGTH} and ${POST_VALIDATION.TITLE_MAX_LENGTH} characters`
    );

const validateCategory = () =>
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Invalid category ID');

const validateStatus = (required = false) => {
  const validator = required
    ? body('status').notEmpty().withMessage('Status is required')
    : body('status').optional();

  return validator
    .isIn(VALID_STATUSES)
    .withMessage(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
};

const validateVisibility = (required = false) => {
  const validator = required
    ? body('visibility').notEmpty().withMessage('Visibility is required')
    : body('visibility').optional();

  return validator
    .isIn(VALID_VISIBILITIES)
    .withMessage(
      `Invalid visibility. Must be one of: ${VALID_VISIBILITIES.join(', ')}`
    );
};

const postValidationRules = (requireStatusAndVisibility: boolean) => [
  validateTitle(),
  validateContent(),
  validateCategory(),
  validateStatus(requireStatusAndVisibility),
  validateVisibility(requireStatusAndVisibility),
  validateImages(),
  handleValidationErrors,
];

export const validateCreatePost = postValidationRules(false);

export const validateUpdatePost = postValidationRules(true);

const validateMongoParam = (field: string, message: string) => [
  param(field).isMongoId().withMessage(message),
  handleValidationErrors,
];

export const validatePostId = validateMongoParam('postId', 'Invalid post ID');

export const validateCategoryIdParam = validateMongoParam(
  'categoryId',
  'Invalid category ID'
);

export const validateAuthorId = validateMongoParam(
  'authorId',
  'Invalid author ID'
);