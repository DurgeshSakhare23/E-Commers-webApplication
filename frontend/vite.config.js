import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',   // force IPv4
    port: 5173,          // avoid 3000 conflict
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000', // match backend
        changeOrigin: true,
      },
    },
  },
})