import env from './env.js';

export const REFRESH_TOKEN_COOKIE = 'kn_refresh_token';

export const cookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === 'production',
  sameSite: env.nodeEnv === 'production' ? 'strict' : 'lax',
  path: '/api/admin',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export default cookieOptions;
