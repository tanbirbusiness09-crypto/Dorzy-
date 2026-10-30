import { defineConfig } from 'vite'
import { visitLocationPlugin } from './server/visit-location.js'

export default defineConfig({
  plugins: [visitLocationPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['.monkeycode-ai.live'],
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['.monkeycode-ai.live'],
  },
})
