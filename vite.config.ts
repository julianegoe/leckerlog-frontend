import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), VitePWA({
    strategies: 'injectManifest',
    base: "/",
    srcDir: 'src',
    filename: 'service-worker.ts',
    includeAssets: ['./assets/logo.png', './assets/icons/icon-512x512.png',  './assets/icons/icon-192x192.png'],
    manifest: {
      name: 'Leckerlog',
      short_name: 'LCKR',
      description: 'Logge Leggeres!',
      start_url: '/',
      display: 'fullscreen',
      
      theme_color: '#ffffff',
      icons: [
        {
          src: 'src/assets/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'src/assets/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ],
      shortcuts: [
        {
          name: 'Gericht hinzufügen',
          short_name: 'Hinzufügen',
          url: '/add',
          icons: [],
        },
      ]
    }

  })]
})
