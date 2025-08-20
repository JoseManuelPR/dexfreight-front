import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

// Set up Pinia for tests
const pinia = createPinia()
setActivePinia(pinia)

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

const mockRouter = {
  push: () => {},
  replace: () => {},
  go: () => {},
  back: () => {},
  forward: () => {},
  currentRoute: {
    value: {
      path: '/',
      name: 'Dashboard',
      meta: { title: 'Dashboard' }
    }
  }
}

const mockRoute = {
  path: '/',
  name: 'Dashboard',
  meta: { title: 'Dashboard' },
  params: {},
  query: {}
}

config.global.mocks = {
  $router: mockRouter,
  $route: mockRoute
}

config.global.stubs = {
  RouterLink: true,
  AdminLayout: true
}

// Add Pinia to global plugins
config.global.plugins = [pinia]
