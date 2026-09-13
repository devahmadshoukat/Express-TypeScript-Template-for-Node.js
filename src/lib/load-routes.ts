import { Router, type Request, type Response, type NextFunction } from 'express';
import { readdirSync, statSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { logger } from './logger.js';

/**
 * File-system based routing — same idea as Next.js's App Router, built
 * from scratch with plain Express (no Next.js involved).
 *
 * How it works:
 *   src/app/route.ts                    ->  GET/POST/...  /
 *   src/app/api/health/route.ts         ->  GET/POST/...  /api/health
 *   src/app/api/users/[id]/route.ts     ->  GET/POST/...  /api/users/:id
 *
 * The folder path under `app/` IS the URL path. A folder named `[id]`
 * becomes an Express `:id` param. Inside each `route.ts`, export a
 * function named after the HTTP method it should handle:
 *
 *   export function GET(req, res) { ... }
 *   export function POST(req, res) { ... }
 *
 * No manual route registration needed — just add a folder + route.ts.
 */

type Handler = (req: Request, res: Response, next: NextFunction) => unknown;

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const;
const ROUTE_FILE = /^route\.(ts|js)$/;
const DYNAMIC_SEGMENT = /^\[(.+)\]$/; // e.g. "[id]" -> "id"

// This file lives in src/lib/, so app/ is one level up: src/app/
const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_DIR = join(__dirname, '..', 'app');

/** Recursively finds every `route.ts` / `route.js` file under a directory. */
function findRouteFiles(dir: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);

    if (statSync(fullPath).isDirectory()) {
      files.push(...findRouteFiles(fullPath));
    } else if (ROUTE_FILE.test(entry)) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Converts a route file's folder path into an Express path.
 *   .../app/api/users/[id]/route.ts  ->  /api/users/:id
 */
function toExpressPath(routeFile: string): string {
  const relativeDir = relative(APP_DIR, dirname(routeFile));
  const segments = relativeDir.split(sep).filter(Boolean);

  const expressSegments = segments.map((segment) => {
    const match = segment.match(DYNAMIC_SEGMENT);
    return match ? `:${match[1]}` : segment;
  });

  return '/' + expressSegments.join('/');
}

/** Scans `app/` and builds an Express router mirroring its folder structure. */
export async function loadRoutes(): Promise<Router> {
  const router = Router();

  for (const file of findRouteFiles(APP_DIR)) {
    const path = toExpressPath(file);
    const module = await import(pathToFileURL(file).href);

    let registeredMethods = 0;

    for (const method of HTTP_METHODS) {
      const handler = module[method] as Handler | undefined;
      if (typeof handler !== 'function') continue;

      switch (method) {
        case 'GET':
          router.get(path, handler);
          break;
        case 'POST':
          router.post(path, handler);
          break;
        case 'PUT':
          router.put(path, handler);
          break;
        case 'PATCH':
          router.patch(path, handler);
          break;
        case 'DELETE':
          router.delete(path, handler);
          break;
      }
      registeredMethods++;
    }

    if (registeredMethods === 0) {
      logger.warn(`No GET/POST/PUT/PATCH/DELETE export found in ${file}`);
    } else {
      logger.info(`Route registered: ${path}  <-  ${relative(APP_DIR, file)}`);
    }
  }

  return router;
}
