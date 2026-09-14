import type { Request, Response } from 'express';
import { asyncHandler } from '@/utils/async-handler';

export const GET = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  res.json({
    success: true,
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});
