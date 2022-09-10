import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), VitePWA({
    injectRegister: 'auto',
    includeAssets: ['./assets/logo.png'],
      manifest: {
        name: 'Leckerlog',
        short_name: 'LCKR',
        description: 'Logge Leggeres!',
        theme_color: '#ffffff',
        icons: [
          {
            src: './assets/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: './assets/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }

  })]
})
