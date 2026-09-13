import type { Request, Response } from 'express';

// Folder path api/health -> GET /api/health
export function GET(_req: Request, res: Response): void {
  res.json({
    success: true,
    status: 'ok',
    uptime: process.uptime(),
  });
}
