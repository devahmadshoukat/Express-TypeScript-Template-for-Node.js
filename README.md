# Express TypeScript Template

**Next.js-like file-based routing with Express backend - 100% TypeScript**

## Features

✅ **File-based routing** - Folder structure = URL routes (like Next.js)
✅ **TypeScript strict mode** - Full type safety
✅ **Path aliases** - `@/` for clean imports
✅ **Auto-generated routes** - Just create files, no manual registration
✅ **Error handling** - Centralized error management
✅ **Vercel ready** - Deploy with one click
✅ **Minimal** - Only essential dependencies
✅ **100% TypeScript** - Zero JavaScript in source

## Quick Start

```bash
# Install
npm install

# Development
npm run dev        # http://localhost:4000

# Build
npm run build

# Production
npm start
```

## Project Structure

```
src/
├── app/                          # Routes (folder = URL path)
│   ├── route.ts                  # GET /api
│   ├── health/
│   │   └── route.ts              # GET /api/health
│   └── users/
│       ├── route.ts              # GET/POST /api/users
│       └── [id]/
│           └── route.ts          # GET/PUT/DELETE /api/users/:id
├── middleware/
│   └── errors.ts                 # Error handling
├── utils/
│   ├── logger.ts                 # Logging
│   └── async-handler.ts          # Async error handling
├── types/
│   └── index.ts                  # TypeScript types
├── config.ts                      # Environment config
└── server.ts                      # Express setup

scripts/
└── generate-routes.ts            # Route generation (TypeScript)
```

## How It Works

### 1. Create Route File

Create `src/app/posts/route.ts`:

```typescript
import type { Request, Response } from 'express';
import { asyncHandler } from '@/utils/async-handler';

export const GET = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  res.json({ success: true, data: [] });
});

export const POST = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  res.status(201).json({ success: true, data: req.body });
});
```

**Automatically creates:** `GET /api/posts` and `POST /api/posts`

### 2. Dynamic Routes

Create `src/app/posts/[id]/route.ts`:

```typescript
export const GET = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const postId = req.params.id;
  res.json({ success: true, data: { id: postId } });
});
```

**Automatically creates:** `GET /api/posts/:id`

### 3. Use Path Aliases

```typescript
// Instead of:
import { asyncHandler } from '../../../utils/async-handler';

// Use:
import { asyncHandler } from '@/utils/async-handler';
```

## Available HTTP Methods

Export any of these functions in your route files:

```typescript
export const GET = asyncHandler(async (req, res) => { ... });
export const POST = asyncHandler(async (req, res) => { ... });
export const PUT = asyncHandler(async (req, res) => { ... });
export const PATCH = asyncHandler(async (req, res) => { ... });
export const DELETE = asyncHandler(async (req, res) => { ... });
```

## API Endpoints

### Users

```bash
# List users
GET /api/users

# Create user
POST /api/users
Content-Type: application/json
{\"name\": \"John\", \"email\": \"john@example.com\"}

# Get user
GET /api/users/1

# Update user
PUT /api/users/1
{\"name\": \"Jane\"}

# Delete user
DELETE /api/users/1
```

### Health

```bash
GET /api/health
```

## Error Handling

Throw errors in your routes:

```typescript
import { ApiError } from '@/middleware/errors';

if (!user) {
  throw new ApiError(404, 'User not found', 'USER_NOT_FOUND');
}
```

## Environment Variables

Create `.env`:

```
NODE_ENV=development
PORT=4000
CORS_ORIGIN=*
```

## Deployment

### Vercel

```bash
git push origin main
```

Vercel automatically:
1. Generates routes
2. Builds TypeScript
3. Deploys to production

### Docker

```bash
docker build -t api .
docker run -p 4000:4000 api
```

## Next Steps

- Add a database (MongoDB, Postgres, etc.)
- Add authentication middleware
- Add validation schemas (Zod)
- Add testing (Jest, Vitest)
- Add more routes following the same pattern

## License

MIT
