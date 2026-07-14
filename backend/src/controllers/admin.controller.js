import { AuthService } from '../services/auth.service.js';
import { DashboardService } from '../services/dashboard.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { REFRESH_TOKEN_COOKIE, cookieOptions } from '../config/cookies.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validated.body;
  const result = await AuthService.login({ email, password });

  res.cookie(REFRESH_TOKEN_COOKIE, result.refreshToken, cookieOptions);

  return ApiResponse.success(res, {
    message: 'Login successful',
    data: {
      accessToken: result.accessToken,
      admin: result.admin,
    },
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];
  const result = await AuthService.refresh(refreshToken);

  return ApiResponse.success(res, {
    message: 'Token refreshed',
    data: {
      accessToken: result.accessToken,
      admin: {
        id: result.admin.id,
        name: result.admin.name,
        email: result.admin.email,
        role: result.admin.role,
      },
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];
  await AuthService.logout(refreshToken);

  res.clearCookie(REFRESH_TOKEN_COOKIE, { ...cookieOptions, maxAge: 0 });

  return ApiResponse.success(res, { message: 'Logged out successfully', data: null });
});

export const getMe = asyncHandler(async (req, res) => {
  const admin = await AuthService.getProfile(req.admin.id);

  return ApiResponse.success(res, {
    message: 'Profile fetched',
    data: admin,
  });
});

export const changeEmail = asyncHandler(async (req, res) => {
  const result = await AuthService.changeEmail(req.admin.id, req.validated.body);

  return ApiResponse.success(res, {
    message: 'Email updated successfully',
    data: {
      accessToken: result.accessToken,
      admin: result.admin,
    },
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const result = await AuthService.changePassword(req.admin.id, req.validated.body);

  res.cookie(REFRESH_TOKEN_COOKIE, result.refreshToken, cookieOptions);

  return ApiResponse.success(res, {
    message: 'Password updated successfully',
    data: {
      accessToken: result.accessToken,
      admin: result.admin,
    },
  });
});

export const getDashboard = asyncHandler(async (_req, res) => {
  const stats = await DashboardService.getStats();

  return ApiResponse.success(res, {
    message: 'Dashboard stats fetched',
    data: stats,
  });
});
