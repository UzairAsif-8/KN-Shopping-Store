import { z } from 'zod';

export const adminLoginSchema = z.object({
  body: z.object({
    email: z.string().email('Valid email is required'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const changeEmailSchema = z.object({
  body: z.object({
    email: z.string().email('Valid email is required'),
    currentPassword: z.string().min(1, 'Current password is required'),
  }),
});

export const changePasswordSchema = z.object({
  body: z
    .object({
      currentPassword: z.string().min(1, 'Current password is required'),
      newPassword: z
        .string()
        .min(8, 'New password must be at least 8 characters')
        .regex(/[A-Za-z]/, 'New password must include a letter')
        .regex(/[0-9]/, 'New password must include a number'),
      confirmPassword: z.string().min(1, 'Please confirm the new password'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: 'New password must be different from current password',
      path: ['newPassword'],
    }),
});

export const refreshTokenSchema = z.object({
  body: z.object({}).optional(),
});
