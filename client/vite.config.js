import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// Importa la variable de entorno VITE_API_HOST, con valor por defecto si no está definida
// y la uso en la configuración del proxy
// esto sirve para que en desarrollo las peticiones a la API se redirijan al backend
// y en producción use rutas relativas (backend sirve el frontend y la API desde el mismo origen)
const { VITE_API_HOST = "http://localhost:3000" } = import.meta;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: VITE_API_HOST,
        changeOrigin: true,
      },
    }
  },
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      assets: '/public/assets',
      utils: '/src/utils',
      hooks: '/src/hooks',
      styles: '/src/styles',
      guards: '/src/guards',
      context: '/src/context',
      icons: '/src/icons',
    },
  },
  build: {
    outDir: '../dist',
  },
})
