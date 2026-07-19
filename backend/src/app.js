import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import env from './config/env.js';
import routes from './routes/index.js';
import { generalLimiter } from './middleware/rateLimiter.middleware.js';
import notFound from './middleware/notFound.middleware.js';
import errorHandler from './middleware/errorHandler.middleware.js';
import { ensureUploadsDir } from './utils/storage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

await ensureUploadsDir();

app.set('trust proxy', 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(
  cors({
    origin(origin, callback) {
      const allowed = new Set([
        env.frontendUrl,
        ...env.frontendOrigins,
        // Common Vite ports when 5173 is already taken
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174',
        'http://127.0.0.1:5175',
      ]);

      // Allow non-browser clients (no Origin) and configured frontend origins
      if (!origin || allowed.has(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(generalLimiter);
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
