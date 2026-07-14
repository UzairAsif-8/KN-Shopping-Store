import { ProductService } from '../services/product.service.js';
import { UploadService } from '../services/upload.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createProductSchema, updateProductSchema } from '../validators/product.validator.js';
import { ApiError } from '../utils/ApiError.js';

const parseBooleanFields = (body) => {
  const parsed = { ...body };

  if (typeof parsed.featured === 'string') {
    parsed.featured = parsed.featured === 'true';
  }

  if (typeof parsed.active === 'string') {
    parsed.active = parsed.active === 'true';
  }

  if (typeof parsed.price === 'string') {
    parsed.price = Number(parsed.price);
  }

  if (typeof parsed.stock === 'string') {
    parsed.stock = Number(parsed.stock);
  }

  if (typeof parsed.images === 'string') {
    try {
      parsed.images = JSON.parse(parsed.images);
    } catch {
      parsed.images = parsed.images.split(',').map((item) => item.trim()).filter(Boolean);
    }
  }

  return parsed;
};

export const getProducts = asyncHandler(async (req, res) => {
  const publicOnly = !req.admin;
  const result = await ProductService.list(req.query, { publicOnly });

  return ApiResponse.success(res, {
    message: 'Products fetched',
    data: result.products,
    meta: result.meta,
  });
});

export const getFeaturedProducts = asyncHandler(async (_req, res) => {
  const products = await ProductService.getFeatured();

  return ApiResponse.success(res, {
    message: 'Featured products fetched',
    data: products,
  });
});

export const getBestSellers = asyncHandler(async (_req, res) => {
  const products = await ProductService.getBestSellers();

  return ApiResponse.success(res, {
    message: 'Best sellers fetched',
    data: products,
  });
});

export const searchProducts = asyncHandler(async (req, res) => {
  const result = await ProductService.search(req.query.q, req.query);

  return ApiResponse.success(res, {
    message: 'Search results fetched',
    data: result.products,
    meta: result.meta,
  });
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const publicOnly = !req.admin;
  const product = await ProductService.getBySlug(req.params.slug, { publicOnly });

  return ApiResponse.success(res, {
    message: 'Product fetched',
    data: product,
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await ProductService.getById(req.params.id);

  return ApiResponse.success(res, {
    message: 'Product fetched',
    data: product,
  });
});

export const createProduct = asyncHandler(async (req, res) => {
  const body = parseBooleanFields(req.body);
  const validation = createProductSchema.shape.body.safeParse(body);

  if (!validation.success) {
    throw new ApiError(
      400,
      'Validation failed',
      validation.error.errors.map((err) => ({ field: err.path.join('.'), message: err.message }))
    );
  }

  const uploadedImages = req.files?.length ? await UploadService.uploadImages(req.files) : [];

  const payload = {
    ...validation.data,
    images: [...(validation.data.images || []), ...uploadedImages],
  };

  const product = await ProductService.create(payload);

  return ApiResponse.created(res, {
    message: 'Product created',
    data: product,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const body = parseBooleanFields(req.body);
  const validation = updateProductSchema.shape.body.safeParse(body);

  if (!validation.success) {
    throw new ApiError(
      400,
      'Validation failed',
      validation.error.errors.map((err) => ({ field: err.path.join('.'), message: err.message }))
    );
  }

  const uploadedImages = req.files?.length ? await UploadService.uploadImages(req.files) : [];

  const payload = { ...validation.data };

  if (uploadedImages.length) {
    payload.images = [...(validation.data.images || []), ...uploadedImages];
  }

  const product = await ProductService.update(req.params.id, payload);

  return ApiResponse.success(res, {
    message: 'Product updated',
    data: product,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await ProductService.remove(req.params.id);

  return ApiResponse.success(res, {
    message: 'Product deleted',
    data: null,
  });
});

export const bulkDeleteProducts = asyncHandler(async (req, res) => {
  const result = await ProductService.bulkDelete(req.validated.body.ids);

  return ApiResponse.success(res, {
    message: `${result.deletedCount} product(s) deleted`,
    data: result,
  });
});

export const uploadProductImages = asyncHandler(async (req, res) => {
  const urls = await UploadService.uploadImages(req.files || []);

  return ApiResponse.success(res, {
    message: 'Images uploaded',
    data: { urls },
  });
});
