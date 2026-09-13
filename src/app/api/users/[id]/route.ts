import type { Request, Response } from 'express';

// Folder path api/users/[id] -> :id becomes a route param automatically
// Handles: GET /api/users/:id  and  DELETE /api/users/:id

export function GET(req: Request, res: Response): void {
  res.json({ success: true, message: `Fetched user ${req.params.id}` });
}

export function DELETE(req: Request, res: Response): void {
  res.json({ success: true, message: `Deleted user ${req.params.id}` });
}
