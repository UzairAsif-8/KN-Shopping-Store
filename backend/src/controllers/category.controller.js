import { CategoryService } from '../services/category.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getCategories = asyncHandler(async (req, res) => {
  const isAdmin = Boolean(req.admin);

  if (isAdmin && (req.query.search || req.query.page || req.query.limit)) {
    const result = await CategoryService.list(req.query);
    return ApiResponse.success(res, {
      message: 'Categories fetched',
      data: result.categories,
      meta: result.meta,
    });
  }

  const categories = await CategoryService.getAllPublic();

  return ApiResponse.success(res, {
    message: 'Categories fetched',
    data: categories.map(({ _count, ...category }) => ({
      ...category,
      productCount: _count?.products ?? 0,
    })),
  });
});

export const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await CategoryService.getBySlug(req.params.slug);

  return ApiResponse.success(res, {
    message: 'Category fetched',
    data: category,
  });
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await CategoryService.getById(req.params.id);

  return ApiResponse.success(res, {
    message: 'Category fetched',
    data: category,
  });
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await CategoryService.create(req.validated.body);

  return ApiResponse.created(res, {
    message: 'Category created',
    data: category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await CategoryService.update(req.params.id, req.validated.body);

  return ApiResponse.success(res, {
    message: 'Category updated',
    data: category,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  await CategoryService.remove(req.params.id);

  return ApiResponse.success(res, {
    message: 'Category deleted',
    data: null,
  });
});
