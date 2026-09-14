export const logger = {
  info: (msg: string): void => console.log(`[INFO] ℹ️  ${msg}`),
  warn: (msg: string): void => console.warn(`[WARN] ⚠️  ${msg}`),
  error: (msg: string): void => console.error(`[ERROR] ❌ ${msg}`),
  success: (msg: string): void => console.log(`[SUCCESS] ✅ ${msg}`),
};
