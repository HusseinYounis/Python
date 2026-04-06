import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Python/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});
