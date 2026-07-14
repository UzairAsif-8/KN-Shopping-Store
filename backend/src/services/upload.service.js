import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary.js';
import { uploadsDir, ensureUploadsDir } from '../utils/storage.js';
import { ApiError } from '../utils/ApiError.js';

export class UploadService {
  static async uploadImages(files = []) {
    if (!files.length) return [];

    await ensureUploadsDir();

    const uploads = files.map((file) => this.uploadSingle(file));
    return Promise.all(uploads);
  }

  static async uploadSingle(file) {
    if (!file) {
      throw new ApiError(400, 'No file provided');
    }

    if (isCloudinaryConfigured()) {
      return this.uploadToCloudinary(file);
    }

    return this.saveLocally(file);
  }

  static uploadToCloudinary(file) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'kn-store/products',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(new ApiError(500, 'Cloudinary upload failed'));
          return resolve(result.secure_url);
        }
      );

      stream.end(file.buffer);
    });
  }

  static async saveLocally(file) {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const filename = `${Date.now()}-${crypto.randomUUID()}${ext}`;
    const filepath = path.join(uploadsDir, filename);

    await fs.writeFile(filepath, file.buffer);

    return `/uploads/${filename}`;
  }
}

export default UploadService;
