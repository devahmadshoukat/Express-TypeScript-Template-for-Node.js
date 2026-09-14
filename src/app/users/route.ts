import type { Request, Response } from 'express';
import { asyncHandler } from '@/utils/async-handler';
import { ApiError } from '@/middleware/errors';

interface User {
  id: number;
  name: string;
  email: string;
  age?: number | null;
}

interface CreateUserBody {
  name: string;
  email: string;
  age?: number;
}

// Mock data
const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
];

// GET /api/users - List all users
export const GET = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  res.json({
    success: true,
    data: users,
    count: users.length,
  });
});

// POST /api/users - Create new user
export const POST = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, email, age } = req.body as CreateUserBody;

  if (!name || !email) {
    throw new ApiError(400, 'Name and email are required', 'MISSING_FIELDS');
  }

  const newUser: User = {
    id: Math.max(...users.map(u => u.id), 0) + 1,
    name,
    email,
    age: age || null,
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser,
    message: 'User created successfully',
  });
});
