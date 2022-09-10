// vite.config.ts
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
var vite_config_default = defineConfig({
  plugins: [vue(), svgLoader(), VitePWA({
    strategies: "injectManifest",
    base: "/",
    srcDir: "src",
    filename: "service-worker.ts",
    includeAssets: ["./assets/logo.png", "./assets/icons/icon-512x512.png", "./assets/icons/icon-192x192.png"],
    manifest: {
      name: "Leckerlog",
      short_name: "LCKR",
      description: "Logge Leggeres!",
      theme_color: "#ffffff",
      icons: [
        {
          src: "./assets/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "./assets/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    }
  })]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvanVsaWFuZS9Db2RpbmcvbGVja2VybG9nXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvanVsaWFuZS9Db2RpbmcvbGVja2VybG9nL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qdWxpYW5lL0NvZGluZy9sZWNrZXJsb2cvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHN2Z0xvYWRlciBmcm9tICd2aXRlLXN2Zy1sb2FkZXInXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCJcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWUoKSwgc3ZnTG9hZGVyKCksIFZpdGVQV0Eoe1xuICAgIHN0cmF0ZWdpZXM6ICdpbmplY3RNYW5pZmVzdCcsXG4gICAgYmFzZTogXCIvXCIsXG4gICAgc3JjRGlyOiAnc3JjJyxcbiAgICBmaWxlbmFtZTogJ3NlcnZpY2Utd29ya2VyLnRzJyxcbiAgICBpbmNsdWRlQXNzZXRzOiBbJy4vYXNzZXRzL2xvZ28ucG5nJywgJy4vYXNzZXRzL2ljb25zL2ljb24tNTEyeDUxMi5wbmcnLCAgJy4vYXNzZXRzL2ljb25zL2ljb24tMTkyeDE5Mi5wbmcnXSxcbiAgICBtYW5pZmVzdDoge1xuICAgICAgbmFtZTogJ0xlY2tlcmxvZycsXG4gICAgICBzaG9ydF9uYW1lOiAnTENLUicsXG4gICAgICBkZXNjcmlwdGlvbjogJ0xvZ2dlIExlZ2dlcmVzIScsXG4gICAgICB0aGVtZV9jb2xvcjogJyNmZmZmZmYnLFxuICAgICAgaWNvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogJy4vYXNzZXRzL2ljb25zL2ljb24tNTEyeDUxMi5wbmcnLFxuICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogJy4vYXNzZXRzL2ljb25zL2ljb24tMTkyeDE5Mi5wbmcnLFxuICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgcHVycG9zZTogJ2FueSBtYXNrYWJsZSdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cblxuICB9KV1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStRLFNBQVMsb0JBQW9CO0FBQzVTLE9BQU8sZUFBZTtBQUN0QixPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlO0FBR3hCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLFFBQVE7QUFBQSxJQUNwQyxZQUFZO0FBQUEsSUFDWixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsSUFDVixlQUFlLENBQUMscUJBQXFCLG1DQUFvQyxpQ0FBaUM7QUFBQSxJQUMxRyxVQUFVO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsT0FBTztBQUFBLFVBQ1AsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxPQUFPO0FBQUEsVUFDUCxNQUFNO0FBQUEsVUFDTixTQUFTO0FBQUEsUUFDWDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFFRixDQUFDLENBQUM7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
