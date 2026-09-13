# Express TypeScript API

A small, production-ready Express + TypeScript starter with file-system based routing — like Next.js's App Router, built from scratch with plain Express (no Next.js).

## Stack

Express 5 · TypeScript (strict) · Zod for env validation · Helmet, CORS & rate limiting for security.

## Project structure

```
src/
├── app/                        # ROUTES ONLY — the folder structure IS the URL
│   ├── route.ts                #   -> GET /
│   └── api/
│       ├── health/
│       │   └── route.ts        #   -> GET /api/health
│       └── users/
│           └── [id]/
│               └── route.ts    #   -> GET/DELETE /api/users/:id
│
├── lib/                        # app infrastructure (not routes)
│   ├── config.ts               #   validates .env with zod, exports typed config
│   ├── logger.ts                #   tiny logger (info/warn/error)
│   ├── errors.ts                 #   ApiError class + 404 handler + error handler
│   ├── load-routes.ts             #   scans app/ and auto-registers every route.ts
│   └── create-app.ts               #   builds the Express app (middleware + routes)
│
└── server.ts                        # entry point — starts the HTTP server
```

`app/` and `lib/` are kept strictly separate: `app/` is *only* URL routes (mirrors Next.js), everything else the app needs lives in `lib/`.

## File-based routing

Routes aren't registered by hand. On startup, `lib/load-routes.ts` walks `src/app/`, and **the folder path becomes the URL**:

| File                                  | Route              |
| -------------------------------------- | ------------------- |
| `src/app/route.ts`                      | `/`                 |
| `src/app/api/health/route.ts`           | `/api/health`       |
| `src/app/api/users/[id]/route.ts`       | `/api/users/:id`    |

A folder named `[id]` automatically becomes an Express `:id` param. Inside each `route.ts`, export a function named after the HTTP method it handles:

```ts
// src/app/api/health/route.ts
import type { Request, Response } from 'express';

export function GET(req: Request, res: Response) {
  res.json({ status: 'ok' });
}
```

**To add a new route:** create a folder under `src/app/` with a `route.ts` inside it. No import to add, no router to update — restart `npm run dev` and it's live.

## Getting started

```bash
npm install
cp .env.example .env
npm run dev                # http://localhost:4000
```

- `GET /` → `{"success":true,"message":"Hello, World!"}`
- `GET /api/health` → `{"success":true,"status":"ok","uptime":...}`
- `GET /api/users/42` → `{"success":true,"message":"Fetched user 42"}`

## Scripts

| Command            | What it does                    |
| ------------------- | -------------------------------- |
| `npm run dev`        | Run with hot-reload (`tsx`)      |
| `npm run build`      | Type-check and compile to `dist/` |
| `npm start`          | Run the compiled build           |
| `npm run typecheck`  | Type-check only, no output       |

## Adding a database later

This starter ships without a database. To add one (MongoDB, Postgres, etc.):

1. Add a `lib/database.ts` with connect/disconnect functions.
2. Call `connectDatabase()` at the top of `start()` in `server.ts`.
3. Import your models directly inside the relevant `route.ts` files under `app/`.
