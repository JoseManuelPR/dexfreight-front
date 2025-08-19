<template>
  <admin-layout>
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-title-md font-semibold text-gray-900 dark:text-white">
            Gestión de Envíos
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Administra todos los envíos del sistema
          </p>
        </div>
        <div class="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            :start-icon="RefreshIcon"
            @click="refreshShipments"
            :disabled="loading"
          >
            Actualizar
          </Button>
        </div>
      </div>
  
      <!-- Shipments Overview -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Total Shipments Card -->
        <div class="lg:col-span-1">
          <div class="rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-orange-100 font-medium">Total de Envíos</p>
                <p class="text-4xl font-bold mt-2">{{ shipmentsStore.shipments.length }}</p>
                <p class="text-orange-100 text-sm mt-1">Envíos registrados</p>
              </div>
              <div class="bg-orange-400 bg-opacity-30 p-3 rounded-lg">
                <BoxIcon class="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <!-- Status Breakdown -->
        <div class="lg:col-span-2">
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-theme-sm border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pendientes</p>
                  <p class="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">{{ shipmentsStore.pendingShipments.length }}</p>
                </div>
                <div class="bg-yellow-500 p-2 rounded-lg">
                  <BoxIcon class="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            
            <div class="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-theme-sm border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-400">En Tránsito</p>
                  <p class="text-2xl font-semibold text-blue-600 dark:text-blue-400">{{ shipmentsStore.activeShipments.length }}</p>
                </div>
                <div class="bg-blue-500 p-2 rounded-lg">
                  <BoxIcon class="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            
            <div class="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-theme-sm border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Entregados</p>
                  <p class="text-2xl font-semibold text-green-600 dark:text-green-400">{{ shipmentsStore.deliveredShipments.length }}</p>
                </div>
                <div class="bg-green-500 p-2 rounded-lg">
                  <CheckIcon class="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            
            <div class="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-theme-sm border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Cancelados/Retrasados</p>
                  <p class="text-2xl font-semibold text-red-600 dark:text-red-400">{{ shipmentsStore.cancelledShipments.length + shipmentsStore.delayedShipments.length }}</p>
                </div>
                <div class="bg-red-500 p-2 rounded-lg">
                  <BoxIcon class="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Filters -->
      <div class="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-theme-sm border border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Buscar
            </label>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Número de seguimiento, cliente..."
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
  
          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estado
            </label>
            <select
              v-model="statusFilter"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              <option value="">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="in_transit">En Tránsito</option>
              <option value="delivered">Entregado</option>
              <option value="cancelled">Cancelado</option>
              <option value="delayed">Retrasado</option>
            </select>
          </div>
  
          <!-- Priority Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prioridad
            </label>
            <select
              v-model="priorityFilter"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              <option value="">Todas las prioridades</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>
  
          <!-- Clear Filters -->
          <div class="flex items-end">
            <Button 
              variant="outline" 
              size="sm" 
              @click="clearFilters"
              class="w-full"
            >
              Limpiar Filtros
            </Button>
          </div>
        </div>
      </div>
  
      <!-- Shipments Table -->
      <div class="rounded-lg bg-white dark:bg-gray-800 shadow-theme-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            Envíos ({{ filteredShipments.length }})
          </h3>
        </div>
  
        <div v-if="loading" class="p-6">
          <div class="animate-pulse space-y-4">
            <div v-for="i in 5" :key="i" class="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
  
        <div v-else-if="filteredShipments.length === 0" class="p-12 text-center">
          <BoxIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-4 text-sm font-medium text-gray-900 dark:text-white">
            No se encontraron envíos
          </h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Intenta ajustar los filtros o crear un nuevo envío
          </p>
        </div>
  
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Seguimiento
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ruta
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cliente
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Estado
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Prioridad
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Fecha
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr 
                v-for="shipment in filteredShipments" 
                :key="shipment.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ shipment.trackingNumber }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    ID: {{ shipment.id }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ shipment.origin.city }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <span>→</span>
                    {{ shipment.destination.city }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ shipment.customer.name }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ shipment.customer.company || shipment.customer.email }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <Badge 
                    :color="getStatusColor(shipment.status)"
                    variant="light"
                    size="sm"
                  >
                    {{ getStatusLabel(shipment.status) }}
                  </Badge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <Badge 
                    :color="getPriorityColor(shipment.priority)"
                    variant="light"
                    size="sm"
                  >
                    {{ getPriorityLabel(shipment.priority) }}
                  </Badge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(shipment.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      @click="openShipmentDetail(shipment)"
                    >
                      Ver
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Shipment Detail Modal -->
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
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import ShipmentDetailModal from '@/components/shipments/ShipmentDetailModal.vue'
import { useShipmentsStore, useDriversStore, useVehiclesStore } from '@/store'
import type { Shipment } from '@/types/models'
import RefreshIcon from '@/icons/RefreshIcon.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import BoxIcon from '@/icons/BoxIcon.vue'
import CheckIcon from '@/icons/CheckIcon.vue'

// Stores
const shipmentsStore = useShipmentsStore()
const driversStore = useDriversStore()
const vehiclesStore = useVehiclesStore()

// Reactive state
const searchTerm = ref('')
const statusFilter = ref('')
const priorityFilter = ref('')

// Modal state
const showDetailModal = ref(false)
const selectedShipment = ref<Shipment | null>(null)

// Computed
const loading = computed(() => shipmentsStore.loading)
const shipments = computed(() => shipmentsStore.shipments)
const drivers = computed(() => driversStore.drivers)
const vehicles = computed(() => vehiclesStore.vehicles)

const filteredShipments = computed(() => {
  let filtered = shipments.value

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(s => 
      s.trackingNumber.toLowerCase().includes(term) ||
      s.customer.name.toLowerCase().includes(term) ||
      s.customer.company?.toLowerCase().includes(term) ||
      s.origin.city.toLowerCase().includes(term) ||
      s.destination.city.toLowerCase().includes(term)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(s => s.status === statusFilter.value)
  }

  if (priorityFilter.value) {
    filtered = filtered.filter(s => s.priority === priorityFilter.value)
  }

  return filtered
})

// Methods
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

function getPriorityColor(priority: string) {
  const colors: Record<string, string> = {
    low: 'light',
    medium: 'primary',
    high: 'warning',
    urgent: 'error'
  }
  return colors[priority] || 'light'
}

function getPriorityLabel(priority: string) {
  const labels: Record<string, string> = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta',
    urgent: 'Urgente'
  }
  return labels[priority] || priority
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('es-PE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(dateString))
}

function clearFilters() {
  searchTerm.value = ''
  statusFilter.value = ''
  priorityFilter.value = ''
}

async function refreshShipments() {
  await Promise.all([
    shipmentsStore.fetchShipments(),
    driversStore.fetchDrivers(),
    vehiclesStore.fetchVehicles()
  ])
}

// Modal functions
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

// Watchers
watch([searchTerm, statusFilter, priorityFilter], () => {
  shipmentsStore.updateFilters({
    searchTerm: searchTerm.value,
    status: statusFilter.value ? [statusFilter.value] : [],
    priority: priorityFilter.value ? [priorityFilter.value] : []
  })
})

// Lifecycle
onMounted(() => {
  refreshShipments()
})

// Export component options
defineComponent({
  components: {
    AdminLayout
  }
})
</script>
