import { Router } from 'express';
import {
  getSiteSections,
  updateSiteSection,
  resetSiteSection,
} from '../controllers/siteSection.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import {
  updateSiteSectionSchema,
  siteSectionKeySchema,
} from '../validators/siteSection.validator.js';

const router = Router();

router.get('/', getSiteSections);

router.put(
  '/:key',
  authenticate,
  requireAdmin,
  validate(updateSiteSectionSchema),
  updateSiteSection
);

router.delete(
  '/:key',
  authenticate,
  requireAdmin,
  validate(siteSectionKeySchema),
  resetSiteSection
);

export default router;
