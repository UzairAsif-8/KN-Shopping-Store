import multer from 'multer';
import env from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

const storage = multer.memoryStorage();

const fileFilter = (_req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid file type. Allowed: JPEG, PNG, WEBP, GIF'));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: env.upload.maxFileSize,
    files: env.upload.maxFiles,
  },
  fileFilter,
});

export const uploadProductImages = upload.array('images', env.upload.maxFiles);

export default upload;
