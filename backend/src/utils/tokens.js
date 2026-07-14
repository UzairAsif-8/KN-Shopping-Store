import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export const signAccessToken = (payload) =>
  jwt.sign(payload, env.jwt.accessSecret, { expiresIn: env.jwt.accessExpiresIn });

export const signRefreshToken = (payload) =>
  jwt.sign(payload, env.jwt.refreshSecret, { expiresIn: env.jwt.refreshExpiresIn });

export const verifyAccessToken = (token) => jwt.verify(token, env.jwt.accessSecret);

export const verifyRefreshToken = (token) => jwt.verify(token, env.jwt.refreshSecret);

export const getRefreshTokenExpiry = () => {
  const days = 7;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
};
