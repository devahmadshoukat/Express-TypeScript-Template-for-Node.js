import cors from 'cors';
import express, { type Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './config.js';
import { errorHandler, notFound } from './errors.js';
import { loadRoutes } from './load-routes.js';

export async function createApp(): Promise<Application> {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json());
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));

  if (config.isDev) app.use(morgan('dev'));

  // Scans src/app (or dist/app) and mounts every route.ts it finds —
  // no manual route registration needed.
  app.use(await loadRoutes());

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
