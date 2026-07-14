import { ApiError } from '../utils/ApiError.js';

export const requireAdmin = (req, _res, next) => {
  if (!req.admin) {
    return next(new ApiError(401, 'Authentication required'));
  }

  if (!['ADMIN', 'SUPER_ADMIN'].includes(req.admin.role)) {
    return next(new ApiError(403, 'Admin access required'));
  }

  return next();
};

export default requireAdmin;
