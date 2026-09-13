/** Tiny timestamped logger. Swap for pino/winston later if you need more. */
export const logger = {
  info: (msg: string, ...meta: unknown[]) => console.log(`[INFO] ${msg}`, ...meta),
  warn: (msg: string, ...meta: unknown[]) => console.warn(`[WARN] ${msg}`, ...meta),
  error: (msg: string, ...meta: unknown[]) => console.error(`[ERROR] ${msg}`, ...meta),
};
