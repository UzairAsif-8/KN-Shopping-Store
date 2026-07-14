import { SiteSectionService } from '../services/siteSection.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getSiteSections = asyncHandler(async (_req, res) => {
  const data = await SiteSectionService.getAll();

  return ApiResponse.success(res, {
    message: 'Site sections fetched',
    data,
  });
});

export const updateSiteSection = asyncHandler(async (req, res) => {
  const { image } = req.validated.body;
  const result = await SiteSectionService.update(req.params.key, image);

  return ApiResponse.success(res, {
    message: 'Section image updated',
    data: result,
  });
});

export const resetSiteSection = asyncHandler(async (req, res) => {
  const result = await SiteSectionService.reset(req.params.key);

  return ApiResponse.success(res, {
    message: 'Section reset to default',
    data: result,
  });
});
