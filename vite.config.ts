import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
      compressionOptions: {
        level: 9,
        chunkSize: 32 * 1024
      }
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
      compressionOptions: {
        params: {
          [11]: 4
        }
      }
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('vue/dist') || id.includes('vue-router/dist')) {
            return 'vue-core'
          }
          if (id.includes('pinia')) {
            return 'vue-core'
          }
          
          if (id.includes('lucide-vue-next')) {
            return 'icons-lazy'
          }
          if (id.includes('apexcharts') || id.includes('vue3-apexcharts')) {
            return 'charts-lazy'
          }
          if (id.includes('flatpickr') || id.includes('dropzone')) {
            return 'forms-lazy'
          }
          if (id.includes('@fullcalendar')) {
            return 'calendar-lazy'
          }
          if (id.includes('jsvectormap') || id.includes('vuevectormap') || 
              id.includes('swiper') || id.includes('vuedraggable')) {
            return 'utils-lazy'
          }
          
          if (id.includes('/pages/Dashboard.vue')) {
            return 'page-dashboard'
          }
          if (id.includes('/pages/Shipments.vue') || id.includes('/components/shipments/')) {
            return 'page-shipments'
          }
          if (id.includes('/pages/Vehicles.vue') || id.includes('/components/vehicles/')) {
            return 'page-vehicles'  
          }
          if (id.includes('/pages/Drivers.vue') || id.includes('/components/drivers/')) {
            return 'page-drivers'
          }
          
          if (id.includes('/components/layout/') && !id.includes('AdminLayout')) {
            return undefined
          }
          
          if (id.includes('AdminLayout')) {
            return 'layout-admin'
          }
        },
      },
    },
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
    },
    chunkSizeWarningLimit: 250,
    sourcemap: false,
    cssCodeSplit: true,
    reportCompressedSize: true,
    modulePreload: {
      polyfill: false,
      resolveDependencies: (url, deps) => {
        return deps.filter(dep => 
          dep.includes('vue-core') || 
          dep.includes('page-dashboard') ||
          dep.includes('main.css')
        )
      }
    },
    assetsInlineLimit: 4096
  },
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  server: {
    hmr: {
      overlay: false
    },
    cors: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  preview: {
    port: 3000,
    open: true,
    strictPort: true,
    host: true
  }
})
