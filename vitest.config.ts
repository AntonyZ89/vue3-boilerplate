/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      all: true,
      exclude: ['**/index.ts', '**/*.d.ts', '.nuxt', '*.config.*', '*rc.*'],
    },
  },
});