import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      setupFiles: ['./vitest.setup.ts'],
      environment: 'jsdom',
      deps: {
        inline: ['vitest-canvas-mock'],
      },
      threads: false,
      environmentOptions: {
        jsdom: {
          resources: 'usable',
        },
      },
      globals: true,
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/],
      },
      coverage: {
        reporter: ['cobertura', 'text', 'text-summary'],
      },
    },
  })
);
