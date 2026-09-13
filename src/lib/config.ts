import 'dotenv/config';
import { z } from 'zod';

/**
 * Validate environment variables once at startup. If something required
 * is missing or malformed, the app fails immediately with a clear error
 * instead of crashing later with a confusing one.
 */
const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  CORS_ORIGIN: z.string().default('*'),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = {
  env: parsed.data.NODE_ENV,
  isDev: parsed.data.NODE_ENV === 'development',
  port: parsed.data.PORT,
  corsOrigin: parsed.data.CORS_ORIGIN,
};
