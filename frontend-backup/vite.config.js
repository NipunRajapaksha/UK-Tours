import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',      // ensures it runs on localhost
    port: 5173,             // you can change this port
    open: true,             // ✅ automatically open browser
  },
});
