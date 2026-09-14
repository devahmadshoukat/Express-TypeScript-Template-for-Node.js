export const logger = {
  info: (msg: string) => console.log(`[INFO] ℹ️  ${msg}`),
  warn: (msg: string) => console.warn(`[WARN] ⚠️  ${msg}`),
  error: (msg: string) => console.error(`[ERROR] ❌ ${msg}`),
  success: (msg: string) => console.log(`[SUCCESS] ✅ ${msg}`),
};
