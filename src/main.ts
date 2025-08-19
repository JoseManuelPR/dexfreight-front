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
    await Promise.all([
      import('jsvectormap/dist/jsvectormap.css' as any),
      import('flatpickr/dist/flatpickr.css' as any)
    ])
  } catch (error) {
    console.warn('Failed to load non-critical dependencies:', error)
  }
}

if (typeof window !== 'undefined') {
  if ((window as any).requestIdleCallback) {
    (window as any).requestIdleCallback(loadNonCriticalDeps)
  } else {
    setTimeout(loadNonCriticalDeps, 100)
  }
}
