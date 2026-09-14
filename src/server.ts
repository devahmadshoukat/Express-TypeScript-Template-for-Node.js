import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './lib/config.js';
import { errorHandler, notFound } from './lib/errors.js';
import { logger } from './lib/logger.js';
import { buildRoutes } from './lib/routes.generated.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));

if (config.isDev) app.use(morgan('dev'));

// Statically generated from src/app/ by scripts/generate-routes.mjs —
// see that file to add/remove routes.
app.use(buildRoutes());

app.use(notFound);
app.use(errorHandler);

// Vercel (and similar serverless hosts) import this file and call the
// exported Express app directly as a request handler — no app.listen()
// needed or wanted there.
export default app;

// Everywhere else (local dev, Docker, a traditional VM/host), run a normal
// persistent HTTP server.
if (!process.env.VERCEL) {
  const server = app.listen(config.port, () => {
    logger.info(`Server running on http://localhost:${config.port}`);
  });

  const shutdown = (): void => {
    logger.info('Shutting down...');
    server.close(() => process.exit(0));
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}
