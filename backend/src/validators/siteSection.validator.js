import { z } from 'zod';

const imageUrlSchema = z
  .string()
  .min(1, 'Image is required')
  .refine(
    (value) =>
      value.startsWith('/uploads/') ||
      value.startsWith('http://') ||
      value.startsWith('https://'),
    { message: 'Image must be a valid URL or /uploads/... path' }
  );

export const updateSiteSectionSchema = z.object({
  params: z.object({
    key: z.string().min(1, 'Section key is required'),
  }),
  body: z.object({
    image: imageUrlSchema,
  }),
});

export const siteSectionKeySchema = z.object({
  params: z.object({
    key: z.string().min(1, 'Section key is required'),
  }),
});
