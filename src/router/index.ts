import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../pages/Dashboard.vue'),
      meta: {
        title: 'Dashboard',
      },
    },
    {
      path: '/shipments',
      name: 'Shipments',
      component: () => import('../pages/Shipments.vue'),
      meta: {
        title: 'Gestión de Envíos',
      },
    },
    {
      path: '/vehicles',
      name: 'Vehicles',
      component: () => import('../pages/Vehicles.vue'),
      meta: {
        title: 'Gestión de Vehículos',
      },
    },
    {
      path: '/drivers',
      name: 'Drivers',
      component: () => import('../pages/Drivers.vue'),
      meta: {
        title: 'Gestión de Conductores',
      },
    }
  ],
})

export default router

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | DexFreight - Sistema de Gestión de Transporte`
  next()
})
