import { z } from 'zod';

export const updateSiteSectionSchema = z.object({
  params: z.object({
    key: z.string().min(1, 'Section key is required'),
  }),
  body: z.object({
    image: z.string().url('Image must be a valid URL'),
  }),
});

export const siteSectionKeySchema = z.object({
  params: z.object({
    key: z.string().min(1, 'Section key is required'),
  }),
});
