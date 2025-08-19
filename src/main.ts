import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

const loadNonCriticalDeps = async () => {
  try {
    await Promise.allSettled([
      import('flatpickr/dist/flatpickr.css')
    ])
  } catch (error) {
    console.warn('Failed to load non-critical dependencies:', error)
  }
}

if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadNonCriticalDeps, { timeout: 2000 })
  } else {
    setTimeout(loadNonCriticalDeps, 100)
  }
}
