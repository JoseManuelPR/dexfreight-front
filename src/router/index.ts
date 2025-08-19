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
        description: 'Panel de control principal de DexFreight con métricas y estadísticas en tiempo real de tu operación de transporte y logística.',
        keywords: 'dashboard, panel de control, métricas de transporte, estadísticas logística, DexFreight',
      },
    },
    {
      path: '/shipments',
      name: 'Shipments',
      component: () => import('../pages/Shipments.vue'),
      meta: {
        title: 'Gestión de Envíos',
        description: 'Administra y rastrea todos tus envíos con DexFreight. Control completo del estado, ubicación y detalles de cada paquete en tránsito.',
        keywords: 'gestión de envíos, tracking, rastreo de paquetes, estado de envío, logística',
      },
    },
    {
      path: '/vehicles',
      name: 'Vehicles',
      component: () => import('../pages/Vehicles.vue'),
      meta: {
        title: 'Gestión de Vehículos',
        description: 'Controla tu flota de vehículos con DexFreight. Monitorea ubicación, mantenimiento, disponibilidad y rendimiento de cada vehículo.',
        keywords: 'gestión de flota, vehículos de transporte, monitoreo de vehículos, flota logística',
      },
    },
    {
      path: '/drivers',
      name: 'Drivers',
      component: () => import('../pages/Drivers.vue'),
      meta: {
        title: 'Gestión de Conductores',
        description: 'Administra tu equipo de conductores con DexFreight. Horarios, asignaciones, rendimiento y comunicación centralizada.',
        keywords: 'gestión de conductores, equipo de transporte, asignación de rutas, conductores profesionales',
      },
    }
  ],
})

export default router

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | DexFreight - Sistema de Gestión de Transporte`
  next()
})
