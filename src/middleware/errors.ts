import type { Request, Response, NextFunction } from 'express';
import { logger } from '@/utils/logger.js';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function notFound(req: Request, _res: Response, next: NextFunction) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`, 'NOT_FOUND'));
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const isApiError = err instanceof ApiError;
  const statusCode = isApiError ? err.statusCode : 500;
  const message = isApiError ? err.message : 'Internal Server Error';
  const code = isApiError ? err.code : 'INTERNAL_ERROR';

  if (!isApiError) {
    logger.error(`Unhandled error: ${err}`);
  }

  res.status(statusCode).json({
    success: false,
    message,
    code,
  });
}
