import { Router } from 'express';
import {
  getProducts,
  getFeaturedProducts,
  getBestSellers,
  searchProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
  uploadProductImages,
} from '../controllers/product.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { optionalAuthenticate } from '../middleware/optionalAuth.middleware.js';
import { uploadProductImages as uploadMiddleware } from '../middleware/upload.middleware.js';
import { uploadLimiter } from '../middleware/rateLimiter.middleware.js';
import {
  productListSchema,
  productSlugSchema,
  productIdSchema,
  bulkDeleteProductsSchema,
  searchProductsSchema,
} from '../validators/product.validator.js';

const router = Router();

router.get('/', optionalAuthenticate, validate(productListSchema), getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/bestsellers', getBestSellers);
router.get('/search', validate(searchProductsSchema), searchProducts);

router.post(
  '/upload',
  authenticate,
  requireAdmin,
  uploadLimiter,
  uploadMiddleware,
  uploadProductImages
);

router.post('/bulk-delete', authenticate, requireAdmin, validate(bulkDeleteProductsSchema), bulkDeleteProducts);

router.get('/slug/:slug', validate(productSlugSchema), optionalAuthenticate, getProductBySlug);
router.get('/id/:id', validate(productIdSchema), getProductById);
router.get('/:slug', validate(productSlugSchema), optionalAuthenticate, getProductBySlug);

router.post('/', authenticate, requireAdmin, uploadMiddleware, createProduct);
router.put('/:id', authenticate, requireAdmin, validate(productIdSchema), uploadMiddleware, updateProduct);
router.delete('/:id', authenticate, requireAdmin, validate(productIdSchema), deleteProduct);

export default router;
