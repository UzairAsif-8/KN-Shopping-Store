import { verifyAccessToken } from '../utils/tokens.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const optionalAuthenticate = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    req.admin = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    };
  } catch {
    req.admin = null;
  }

  return next();
});

export default optionalAuthenticate;
