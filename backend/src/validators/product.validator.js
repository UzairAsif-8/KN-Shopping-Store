import { z } from 'zod';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const priceSchema = z.coerce.number().min(0, 'Price cannot be negative');
const stockSchema = z.coerce.number().int().min(0, 'Stock cannot be negative');

const productBodySchema = z.object({
  categoryId: z.string().min(1, 'Category is required'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(150),
  slug: z.string().regex(slugRegex, 'Invalid slug format').optional(),
  shortDescription: z.string().max(300).optional().nullable(),
  description: z.string().min(10, 'Description must be at least 10 characters').max(5000),
  price: priceSchema,
  images: z.array(z.string().url('Each image must be a valid URL')).optional(),
  stock: stockSchema.optional(),
  featured: z.coerce.boolean().optional(),
  active: z.coerce.boolean().optional(),
});

export const createProductSchema = z.object({
  body: productBodySchema,
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Product id is required'),
  }),
  body: productBodySchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required to update',
  }),
});

export const productIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Product id is required'),
  }),
});

export const productSlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Product slug is required'),
  }),
});

export const productListSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
    category: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    featured: z.enum(['true', 'false']).optional(),
    active: z.enum(['true', 'false']).optional(),
    sort: z.enum(['price_asc', 'price_desc', 'newest', 'oldest', 'name_asc', 'name_desc']).optional(),
  }),
});

export const bulkDeleteProductsSchema = z.object({
  body: z.object({
    ids: z.array(z.string().min(1)).min(1, 'At least one product id is required'),
  }),
});

export const searchProductsSchema = z.object({
  query: z.object({
    q: z.string().min(1, 'Search query is required'),
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});
