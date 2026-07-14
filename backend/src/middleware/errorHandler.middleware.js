import { Prisma } from '@prisma/client';
import env from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const errorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let errors = err.errors || [];

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = 409;
      message = 'A record with this value already exists';
      errors = [{ field: err.meta?.target?.[0] || 'unknown', message }];
    }

    if (err.code === 'P2025') {
      statusCode = 404;
      message = 'Record not found';
    }

    if (err.code === 'P2003') {
      statusCode = 400;
      message = 'Related record not found';
    }
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Invalid or expired token';
  }

  if (env.nodeEnv === 'development' && statusCode === 500) {
    console.error(err);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    ...(env.nodeEnv === 'development' && statusCode === 500 ? { stack: err.stack } : {}),
  });
};

export default errorHandler;
