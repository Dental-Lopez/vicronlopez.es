import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,svelte.ts}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      all: true,
      thresholds: {
        statements: 85,
        branches: 85,
        functions: 85,
        lines: 85,
      },
      exclude: [
        'node_modules/**',
        'src/tests/**',
        'src/app.d.ts',
        '**/*.config.*',
        'build/**',
        '.svelte-kit/**',
        '.vercel/**',
        'tests/**',
        'static/**',
        '**/*.svelte',
        'src/routes/**',
        'src/lib/components/**',
        'worker-configuration.d.ts',
        'scripts/**',
        'eslint.config.js',
      ],
    },
  },
});
