import type { NextFunction, Request, Response } from 'express';
import { config } from './config.js';
import { logger } from './logger.js';

/** Throw this anywhere in the app for expected errors (400s, 404s, etc). */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

/** 404 handler — put this after all routes. */
export function notFound(req: Request, _res: Response, next: NextFunction): void {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

/** Central error handler — put this last, after everything else. */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const isApiError = err instanceof ApiError;
  const statusCode = isApiError ? err.statusCode : 500;
  const message = isApiError ? err.message : 'Something went wrong';

  if (!isApiError) logger.error('Unhandled error', err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(config.isDev && err instanceof Error ? { stack: err.stack } : {}),
  });
}
