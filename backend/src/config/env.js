import dotenv from 'dotenv';

dotenv.config();

const DEV_JWT_ACCESS = 'kn-store-dev-access-secret-change-in-production';
const DEV_JWT_REFRESH = 'kn-store-dev-refresh-secret-change-in-production';

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  databaseUrl: process.env.DATABASE_URL || '',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || DEV_JWT_ACCESS,
    refreshSecret: process.env.JWT_REFRESH_SECRET || DEV_JWT_REFRESH,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@123',
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || String(5 * 1024 * 1024), 10),
    maxFiles: parseInt(process.env.MAX_FILES || '10', 10),
  },
  dummyMode: process.env.DUMMY_MODE === 'true' || process.env.DUMMY_MODE === '1',
};

export const isDummyMode = () => {
  if (env.dummyMode) return true;
  return !Boolean(env.databaseUrl?.trim());
};

export const isDatabaseEnabled = () => !isDummyMode() && Boolean(env.databaseUrl?.trim());

export const validateEnv = () => {
  if (env.nodeEnv === 'production' && !isDatabaseEnabled()) {
    throw new Error('DATABASE_URL is required in production');
  }

  if (env.nodeEnv === 'production') {
    const missing = ['JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'].filter((key) => !process.env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }
};

export const isCloudinaryConfigured = () =>
  Boolean(env.cloudinary.cloudName && env.cloudinary.apiKey && env.cloudinary.apiSecret);

export default env;
