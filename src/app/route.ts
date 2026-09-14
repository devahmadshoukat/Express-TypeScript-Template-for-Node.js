import type { Request, Response } from 'express';
import { asyncHandler } from '@/utils/async-handler';

export const GET = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  res.json({
    success: true,
    message: 'Welcome to Express TypeScript API',
    version: '1.0.0',
    docs: 'https://github.com/devahmadshoukat/Express-TypeScript-Template-for-Node.js',
  });
});
