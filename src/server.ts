import { createApp } from './lib/create-app.js';
import { config } from './lib/config.js';
import { logger } from './lib/logger.js';

async function start(): Promise<void> {
  const app = await createApp();

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

start().catch((err) => {
  logger.error('Failed to start server', err);
  process.exit(1);
});
