import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on all interfaces so LAN / “host” URLs (not only 127.0.0.1) can load the app
    host: true,
    // Vite 8+ validates the Host header; tunnels or custom names need this in dev
    allowedHosts: true,
    watch: {
      // Windows / some setups miss .tsx saves; ensures HMR picks up editor changes
      usePolling: true,
      interval: 200,
    },
  },
})
