import env from './env.js';

export const REFRESH_TOKEN_COOKIE = 'kn_refresh_token';

/**
 * Cross-origin Static Site + API (Render) needs SameSite=None; Secure.
 * Override with COOKIE_SAME_SITE=lax|strict|none if needed.
 */
const sameSite = (() => {
  const configured = (process.env.COOKIE_SAME_SITE || '').toLowerCase();
  if (['lax', 'strict', 'none'].includes(configured)) return configured;
  return env.nodeEnv === 'production' ? 'none' : 'lax';
})();

export const cookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === 'production' || sameSite === 'none',
  sameSite,
  path: '/api/admin',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export default cookieOptions;
