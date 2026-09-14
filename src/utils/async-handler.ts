import type { Request, Response, NextFunction } from 'express';

/**
 * Wraps async route handlers to catch errors automatically
 * Usage: export const GET = asyncHandler(async (req, res) => { ... })
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void> | void,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
