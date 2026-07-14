import { Router } from 'express';
import adminRoutes from './admin.routes.js';
import categoryRoutes from './category.routes.js';
import productRoutes from './product.routes.js';
import siteSectionRoutes from './siteSection.routes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'KN Store API is running',
    data: {
      timestamp: new Date().toISOString(),
    },
  });
});

router.use('/admin', adminRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/site-sections', siteSectionRoutes);

export default router;
