import { Router, Request, Response } from 'express';

const router = Router();

// Health check
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'ok',
    uptime: process.uptime(),
  });
});

// Welcome
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Express TypeScript API',
    version: '1.0.0',
  });
});

export default router;
