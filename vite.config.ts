import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES ? '/fakestoreapp/' : '/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  preview: {
    port: 3000,
  },
});