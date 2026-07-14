export { ApiError } from './ApiError.js';
export { ApiResponse } from './ApiResponse.js';
export { asyncHandler } from './asyncHandler.js';
export { slugify } from './slugify.js';
export { getPagination, buildPaginationMeta } from './pagination.js';
export { uploadsDir, ensureUploadsDir, getDirectorySize, formatBytes } from './storage.js';
export { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken, getRefreshTokenExpiry } from './tokens.js';

export const sanitizeString = (value) => {
  if (typeof value !== 'string') return value;
  return value.replace(/[<>]/g, '').trim();
};

export const serializeProduct = (product) => ({
  ...product,
  price: product.price ? Number(product.price) : 0,
  category: product.category
    ? {
        id: product.category.id,
        name: product.category.name,
        slug: product.category.slug,
      }
    : undefined,
});

export const serializeProducts = (products) => products.map(serializeProduct);
