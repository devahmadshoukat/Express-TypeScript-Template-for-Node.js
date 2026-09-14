import type { Request, Response } from 'express';
import { asyncHandler } from '@/utils/async-handler.js';
import { ApiError } from '@/middleware/errors.js';

// Mock data (shared with users/route.ts in real app)
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
];

// GET /api/users/:id - Get user by ID
export const GET = asyncHandler(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    throw new ApiError(404, `User ${userId} not found`, 'USER_NOT_FOUND');
  }

  res.json({
    success: true,
    data: user,
  });
});

// PUT /api/users/:id - Update user
export const PUT = asyncHandler(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    throw new ApiError(404, `User ${userId} not found`, 'USER_NOT_FOUND');
  }

  const { name, email, age } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (age !== undefined) user.age = age;

  res.json({
    success: true,
    data: user,
    message: 'User updated successfully',
  });
});

// DELETE /api/users/:id - Delete user
export const DELETE = asyncHandler(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    throw new ApiError(404, `User ${userId} not found`, 'USER_NOT_FOUND');
  }

  const deletedUser = users.splice(index, 1);

  res.json({
    success: true,
    data: deletedUser[0],
    message: 'User deleted successfully',
  });
});
