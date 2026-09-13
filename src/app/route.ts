import type { Request, Response } from 'express';

// This file sits at the root of app/, so it handles: GET /
export function GET(_req: Request, res: Response): void {
  res.json({ success: true, message: 'Hello, World!' });
}
