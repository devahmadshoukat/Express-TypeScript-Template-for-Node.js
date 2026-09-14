import type { Request, Response } from 'express';
import { asyncHandler } from '@/utils/async-handler.js';

export const GET = asyncHandler(async (_req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});
