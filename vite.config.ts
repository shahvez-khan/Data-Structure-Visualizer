import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // ADD this line to explicitly set the base path to the root
  base: '/data-structure-visualizer/',
  plugins: [react()],
});