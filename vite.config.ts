import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader({
    defaultImport: 'component'
  }), VitePWA({
    strategies: 'injectManifest',
    base: "/",
    srcDir: 'src',
    filename: 'service-worker.ts',
    includeAssets: [
      './assets/logo.png',
      './assets/icons/icon-512x512.png',
      './assets/icons/icon-192x192.png',
      './assets/splash_screens/iPhone_11__iPhone_XR_landscape.png'],
    manifest: {
      name: 'Leckerlog',
      short_name: 'LCKR',
      description: 'Logge Leggeres!',
      start_url: '/',
      display: 'fullscreen',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/192.png',
          sizes: '192x192',
          type: 'image/png',
        }
      ],
      background_color: '#c68aff',
      shortcuts: [
        {
          name: 'Gericht hinzufügen',
          short_name: 'Hinzufügen',
          url: '/add',
          icons: [
            {
              src: "/pen.png",
              sizes: "96x96",
              type: "image/png",
          }
          ],
        },
      ]
    }

  })]
})
