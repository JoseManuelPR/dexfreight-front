<template>
  <admin-layout>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-title-md font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Resumen general del sistema de transporte
          </p>
        </div>
        <div class="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            :start-icon="RefreshIcon"
            @click="refreshData"
            :disabled="loading"
          >
            Actualizar
          </Button>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Envíos"
          :value="stats?.totalShipments || 0"
          icon="BoxIcon"
          color="blue"
        />
        <StatsCard
          title="En Tránsito"
          :value="stats?.activeShipments || 0"
          icon="TruckIcon"
          color="green"
        />
        <StatsCard
          title="Entregados"
          :value="stats?.deliveredShipments || 0"
          icon="CheckIcon"
          color="purple"
        />
        <StatsCard
          title="Ingresos Totales"
          :value="formatCurrency(stats?.totalRevenue || 0)"
          icon="CurrencyIcon"
          color="orange"
        />
      </div>
  
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div class="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-theme-sm border border-gray-200 dark:border-gray-700">
            <div class="mb-6 flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                Envíos Recientes
              </h3>
              <router-link 
                to="/shipments"
                class="text-sm font-medium text-brand-500 hover:text-brand-600"
              >
                Ver todos
              </router-link>
            </div>
            
            <div v-if="shipmentsLoading" class="space-y-3">
              <div v-for="i in 5" :key="i" class="animate-pulse">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            </div>
  
            <div v-else-if="recentShipments.length === 0" class="text-center py-8">
              <p class="text-gray-500 dark:text-gray-400">No hay envíos recientes</p>
            </div>
  
            <div v-else class="space-y-4">
              <div 
                v-for="shipment in recentShipments" 
                :key="shipment.id"
                class="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                @click="openShipmentDetail(shipment)"
              >
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <span class="font-medium text-gray-900 dark:text-white">
                      {{ shipment.trackingNumber }}
                    </span>
                    <Badge 
                      :color="getStatusColor(shipment.status)"
                      variant="light"
                      size="sm"
                    >
                      {{ getStatusLabel(shipment.status) }}
                    </Badge>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {{ shipment.origin.city }} → {{ shipment.destination.city }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900 dark:text-white">
                    {{ formatCurrency(shipment.value) }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(shipment.createdAt) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="space-y-6">
          <div class="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-theme-sm border border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Estado de Vehículos
            </h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Disponibles</span>
                <Badge color="success" variant="light" size="sm">
                  {{ vehiclesStore.availableVehicles.length }}
                </Badge>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">En Uso</span>
                <Badge color="primary" variant="light" size="sm">
                  {{ vehiclesStore.vehiclesInUse.length }}
                </Badge>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Mantenimiento</span>
                <Badge color="warning" variant="light" size="sm">
                  {{ vehiclesStore.vehiclesInMaintenance.length }}
                </Badge>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Fuera de Línea</span>
                <Badge color="error" variant="light" size="sm">
                  {{ vehiclesStore.vehiclesOffline.length }}
                </Badge>
              </div>
            </div>
          </div>
  
          <div class="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-theme-sm border border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Estado de Conductores
            </h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Disponibles</span>
                <Badge color="success" variant="light" size="sm">
                  {{ driversStore.availableDrivers.length }}
                </Badge>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">En Entrega</span>
                <Badge color="primary" variant="light" size="sm">
                  {{ driversStore.driversOnDelivery.length }}
                </Badge>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Fuera de Servicio</span>
                <Badge color="warning" variant="light" size="sm">
                  {{ driversStore.driversOffDuty.length }}
                </Badge>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Suspendidos</span>
                <Badge color="error" variant="light" size="sm">
                  {{ driversStore.driversSuspended.length }}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ShipmentDetailModal
      v-if="showDetailModal && selectedShipment"
      :shipment="selectedShipment"
      :drivers="drivers"
      :vehicles="vehicles"
      @close="closeShipmentDetail"
      @edit="editShipment"
    />
  </admin-layout>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import StatsCard from '@/components/dashboard/StatsCard.vue'

const ShipmentDetailModal = defineAsyncComponent(() => 
  import('@/components/shipments/ShipmentDetailModal.vue')
)
import { useShipmentsStore } from '@/store'
import { useVehiclesStore } from '@/store'
import { useDriversStore } from '@/store'
import { useDashboardStore } from '@/store'
import type { Shipment } from '@/types/models'
import RefreshIcon from '@/icons/RefreshIcon.vue'

const shipmentsStore = useShipmentsStore()
const vehiclesStore = useVehiclesStore()
const driversStore = useDriversStore()
const dashboardStore = useDashboardStore()

const showDetailModal = ref(false)
const selectedShipment = ref<Shipment | null>(null)

const stats = computed(() => dashboardStore.stats || dashboardStore.getComputedStats())
const loading = computed(() => dashboardStore.loading)
const shipmentsLoading = computed(() => shipmentsStore.loading)
const drivers = computed(() => driversStore.drivers)
const vehicles = computed(() => vehiclesStore.vehicles)

const recentShipments = computed(() => 
  shipmentsStore.shipments
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
)



function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    pending: 'warning',
    in_transit: 'primary',
    delivered: 'success',
    cancelled: 'error',
    delayed: 'error'
  }
  return colors[status] || 'light'
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    pending: 'Pendiente',
    in_transit: 'En Tránsito',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
    delayed: 'Retrasado'
  }
  return labels[status] || status
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(value)
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('es-PE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(dateString))
}

async function refreshData() {
  await dashboardStore.fetchDashboardStats()
  
  Promise.all([
    shipmentsStore.fetchShipments(),
    vehiclesStore.fetchVehicles(),
    driversStore.fetchDrivers()
  ]).catch(err => console.error('Error loading secondary data:', err))
}

function openShipmentDetail(shipment: Shipment) {
  selectedShipment.value = shipment
  showDetailModal.value = true
}

function closeShipmentDetail() {
  showDetailModal.value = false
  selectedShipment.value = null
}

function editShipment(shipment: Shipment) {
  // TODO: Implement edit functionality
  console.log('Edit shipment:', shipment.id)
  closeShipmentDetail()
}

onMounted(async () => {
  await dashboardStore.fetchDashboardStats()
  
  const loadSecondaryData = () => {
    Promise.allSettled([
      shipmentsStore.fetchShipments(),
      vehiclesStore.fetchVehicles(),
      driversStore.fetchDrivers()
    ]).catch(err => console.error('Error loading secondary data:', err))
  }
  
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadSecondaryData, { timeout: 2000 })
  } else {
    setTimeout(loadSecondaryData, 100)
  }
})

</script>
