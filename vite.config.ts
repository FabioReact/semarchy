/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite'
// import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // tells Vitest to run our tests in a mock browser environment rather than the default Node environment
    setupFiles: './src/tests/setup.ts',
  },
});