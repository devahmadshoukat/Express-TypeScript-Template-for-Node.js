import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  format: ['esm'],
  target: 'node20',
  platform: 'node',
  bundle: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  // tsup/esbuild reads tsconfig.json automatically and resolves the
  // "@/*" paths itself, so source files can keep plain, extensionless
  // "@/..." imports — no ".js" suffixes required anywhere.
});
