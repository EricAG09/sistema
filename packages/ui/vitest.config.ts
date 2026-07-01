import { defineConfig } from 'vitest/config';
import path from 'node:path';

// NOTE: workspace packages (@nexus-ui/*) ship a `dist` build that is produced by
// `tsc`. That build is currently broken repo-wide (tsconfig.base.json requires
// `vite/client` types that aren't resolvable from packages without a vite
// dependency) — a pre-existing issue outside this task's scope. Aliasing to
// package `src` lets vitest exercise current source instead of stale/missing
// `dist` output. Safe to remove once the repo-wide build issue is fixed.
export default defineConfig({
  resolve: {
    alias: {
      '@nexus-ui/tokens': path.resolve(__dirname, '../tokens/src/index.ts'),
      '@nexus-ui/theme': path.resolve(__dirname, '../theme/src/index.tsx')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}']
  }
});
