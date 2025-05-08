import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['LogoMimon.png'],
      manifest: {
        name: 'Proyectito 2',
        short_name: 'Proy2',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ff8800',
        orientation: 'portrait',
        description: 'Aplicación PWA de Proyectito 2 desarrollada con React + Vite.',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
});
