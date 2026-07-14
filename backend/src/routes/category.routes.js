import { Router } from 'express';
import {
  getCategories,
  getCategoryBySlug,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { optionalAuthenticate } from '../middleware/optionalAuth.middleware.js';
import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
  categorySlugSchema,
  categorySearchSchema,
} from '../validators/category.validator.js';

const router = Router();

router.get('/', optionalAuthenticate, validate(categorySearchSchema), getCategories);
router.get('/slug/:slug', validate(categorySlugSchema), getCategoryBySlug);
router.get('/id/:id', validate(categoryIdSchema), getCategoryById);
router.get('/:slug', validate(categorySlugSchema), getCategoryBySlug);

router.post('/', authenticate, requireAdmin, validate(createCategorySchema), createCategory);
router.put('/:id', authenticate, requireAdmin, validate(updateCategorySchema), updateCategory);
router.delete('/:id', authenticate, requireAdmin, validate(categoryIdSchema), deleteCategory);

export default router;
