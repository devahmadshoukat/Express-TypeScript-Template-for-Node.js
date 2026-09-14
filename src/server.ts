import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from '@/config.js';
import { errorHandler, notFound } from '@/middleware/errors.js';
import { logger } from '@/utils/logger.js';
import { buildRoutes } from '@/lib/routes.generated.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (auto-generated from src/app/ folder structure)
app.use('/api', buildRoutes());

// Error handling
app.use(notFound);
app.use(errorHandler);

// Export for Vercel
export default app;

// Start server locally
if (!process.env.VERCEL) {
  const server = app.listen(config.port, () => {
    logger.info(`🚀 Server running on http://localhost:${config.port}`);
    logger.info(`📚 API docs at http://localhost:${config.port}/api`);
  });

  const shutdown = () => {
    logger.info('Shutting down...');
    server.close(() => process.exit(0));
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}
