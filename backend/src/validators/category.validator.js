import { z } from 'zod';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    slug: z.string().regex(slugRegex, 'Invalid slug format').optional(),
    description: z.string().max(1000).optional().nullable(),
    image: z.string().url('Image must be a valid URL').optional().nullable(),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Category id is required'),
  }),
  body: z
    .object({
      name: z.string().min(2).max(100).optional(),
      slug: z.string().regex(slugRegex, 'Invalid slug format').optional(),
      description: z.string().max(1000).optional().nullable(),
      image: z.string().url('Image must be a valid URL').optional().nullable(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required to update',
    }),
});

export const categoryIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Category id is required'),
  }),
});

export const categorySlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Category slug is required'),
  }),
});

export const categorySearchSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
    sort: z.enum(['name_asc', 'name_desc', 'newest', 'oldest']).optional(),
  }),
});
