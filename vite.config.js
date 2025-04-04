import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { VitePWA } from 'vite-plugin-pwa';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    quasar({
      sassVariables: 'src/quasar-variables.sass',
      components: ['QBtn', 'QIcon' /* ... */],
      directives: ['Ripple', 'TouchPan' /* ... */]
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      strategies: 'generateSW',
      manifest: {
        name: 'کشاورز',
        prefer_related_applications: false,
        short_name: 'Keshavarz',
        description: '...',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        orientation: 'portrait',
        scope: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname === '/',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 24 * 60 * 60 // 1 روز
              }
            }
          },
          {
            urlPattern: ({request}) => request.destination === 'document',
            handler: 'NetworkFirst',
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          }
        ],
        cacheId: 'keshavarz-cache-v1',
      },
      includeAssets: [
        'favicon.ico',
        'robots.txt',
        'webfonts/**/*.woff2' // اطمینان از کش فونت‌ها
      ],
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html'
      }
    }),

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
    mainFields: [
      'browser',
      'module',
      'main',
      'jsnext:main',
      'jsnext'
    ]
  },

})
