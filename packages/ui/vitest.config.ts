import { defineConfig } from 'vitest/config';
import path from 'node:path';

// Alias workspace packages to their `src` so vitest exercises live source
// instead of the published `dist` build. This keeps tests in sync with the
// current source without requiring a rebuild of dependencies before each run.
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
