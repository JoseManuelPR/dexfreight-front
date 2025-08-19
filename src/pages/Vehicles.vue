<template>
  <admin-layout>
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-title-md font-semibold text-gray-900 dark:text-white">
            Gestión de Vehículos
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Administra la flota de vehículos
          </p>
        </div>
        <div class="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            :start-icon="RefreshIcon"
            @click="refreshVehicles"
            :disabled="loading"
          >
            Actualizar
          </Button>
        </div>
      </div>
  
      <!-- Fleet Overview -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Total Fleet Card -->
        <div class="lg:col-span-1">
          <div class="rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-orange-100 font-medium">Flota Total</p>
                <p class="text-4xl font-bold mt-2">{{ vehicles.length }}</p>
                <p class="text-orange-100 text-sm mt-1">Vehículos registrados</p>
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
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Disponibles</p>
                  <p class="text-2xl font-semibold text-green-600 dark:text-green-400">{{ vehiclesStore.availableVehicles.length }}</p>
                </div>
                <div class="bg-green-500 p-2 rounded-lg">
                  <CheckIcon class="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            
            <div class="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-theme-sm border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-400">En Uso</p>
                  <p class="text-2xl font-semibold text-blue-600 dark:text-blue-400">{{ vehiclesStore.vehiclesInUse.length }}</p>
                </div>
                <div class="bg-blue-500 p-2 rounded-lg">
                  <BoxIcon class="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            
            <div class="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-theme-sm border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Mantenimiento</p>
                  <p class="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">{{ vehiclesStore.vehiclesInMaintenance.length }}</p>
                </div>
                <div class="bg-yellow-500 p-2 rounded-lg">
                  <WarningIcon class="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            
            <div class="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-theme-sm border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Fuera de Línea</p>
                  <p class="text-2xl font-semibold text-red-600 dark:text-red-400">{{ vehiclesStore.vehiclesOffline.length }}</p>
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Buscar
            </label>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Placa, modelo, marca..."
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estado
            </label>
            <select
              v-model="statusFilter"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              <option value="">Todos los estados</option>
              <option value="available">Disponible</option>
              <option value="in-use">En Uso</option>
              <option value="maintenance">Mantenimiento</option>
              <option value="offline">Fuera de Línea</option>
            </select>
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tipo
            </label>
            <select
              v-model="typeFilter"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              <option value="">Todos los tipos</option>
              <option value="truck">Camión</option>
              <option value="van">Camioneta</option>
              <option value="trailer">Tráiler</option>
              <option value="pickup">Pickup</option>
            </select>
          </div>
        </div>
      </div>
  
      <!-- Vehicles Grid -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="animate-pulse">
          <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
  
      <div v-else-if="filteredVehicles.length === 0" class="text-center py-12">
        <BoxIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-4 text-sm font-medium text-gray-900 dark:text-white">
          No se encontraron vehículos
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Intenta ajustar los filtros o agregar un nuevo vehículo
        </p>
      </div>
  
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="vehicle in filteredVehicles" 
          :key="vehicle.id"
          class="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-theme-sm border border-gray-200 dark:border-gray-700 hover:shadow-theme-md transition-shadow"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                {{ vehicle.brand }} {{ vehicle.model }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ vehicle.licensePlate }} • {{ vehicle.year }}
              </p>
            </div>
            <Badge 
              :color="getStatusColor(vehicle.status)"
              variant="light"
              size="sm"
            >
              {{ getStatusLabel(vehicle.status) }}
            </Badge>
          </div>
  
          <div class="space-y-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Tipo:</span>
              <span class="font-medium text-gray-900 dark:text-white">
                {{ getTypeLabel(vehicle.type) }}
              </span>
            </div>
            
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Capacidad:</span>
              <span class="font-medium text-gray-900 dark:text-white">
                {{ vehicle.capacity.toLocaleString() }} kg
              </span>
            </div>
            
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Kilometraje:</span>
              <span class="font-medium text-gray-900 dark:text-white">
                {{ vehicle.mileage.toLocaleString() }} km
              </span>
            </div>
            
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Combustible:</span>
              <span class="font-medium text-gray-900 dark:text-white">
                {{ getFuelTypeLabel(vehicle.fuelType) }}
              </span>
            </div>
  
            <div v-if="vehicle.currentDriverId" class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Conductor:</span>
              <span class="font-medium text-gray-900 dark:text-white">
                Asignado
              </span>
            </div>
          </div>
  
          <div class="mt-6 flex items-center gap-2">
            <Button variant="outline" size="sm" class="flex-1" @click="showVehicleDetails(vehicle)">
              Ver Detalles
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Vehicle Detail Modal -->
    <VehicleDetailModal
      v-if="showDetailModal && selectedVehicle"
      :vehicle="selectedVehicle"
      :drivers="drivers"
      @close="closeVehicleDetail"
      @edit="editVehicle"
    />
  </admin-layout>
</template>

<script setup lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import VehicleDetailModal from '@/components/vehicles/VehicleDetailModal.vue'
import { useVehiclesStore, useDriversStore } from '@/store'
import type { Vehicle } from '@/types/models'
import RefreshIcon from '@/icons/RefreshIcon.vue'
import BoxIcon from '@/icons/BoxIcon.vue'
import CheckIcon from '@/icons/CheckIcon.vue'
import WarningIcon from '@/icons/WarningIcon.vue'

// Stores
const vehiclesStore = useVehiclesStore()
const driversStore = useDriversStore()

// Reactive state
const searchTerm = ref('')
const statusFilter = ref('')
const typeFilter = ref('')

// Modal state
const showDetailModal = ref(false)
const selectedVehicle = ref<Vehicle | null>(null)

// Computed
const loading = computed(() => vehiclesStore.loading)
const vehicles = computed(() => vehiclesStore.vehicles)
const availableVehicles = computed(() => vehiclesStore.availableVehicles)
const vehiclesInTransit = computed(() => vehiclesStore.vehiclesInTransit)
const vehiclesInMaintenance = computed(() => vehiclesStore.vehiclesInMaintenance)
const drivers = computed(() => driversStore.drivers)

const filteredVehicles = computed(() => {
  let filtered = vehicles.value

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(v => 
      v.licensePlate.toLowerCase().includes(term) ||
      v.model.toLowerCase().includes(term) ||
      v.brand.toLowerCase().includes(term)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(v => v.status === statusFilter.value)
  }

  if (typeFilter.value) {
    filtered = filtered.filter(v => v.type === typeFilter.value)
  }

  return filtered
})

// Methods
function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    available: 'success',
    'in-use': 'primary',
    maintenance: 'warning',
    offline: 'error'
  }
  return colors[status] || 'light'
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    available: 'Disponible',
    'in-use': 'En Uso',
    maintenance: 'Mantenimiento',
    offline: 'Fuera de Línea'
  }
  return labels[status] || status
}

function getTypeLabel(type: string) {
  const labels: Record<string, string> = {
    truck: 'Camión',
    van: 'Camioneta',
    trailer: 'Tráiler',
    pickup: 'Pickup'
  }
  return labels[type] || type
}

function getFuelTypeLabel(fuelType: string) {
  const labels: Record<string, string> = {
    diesel: 'Diésel',
    gasoline: 'Gasolina',
    electric: 'Eléctrico',
    hybrid: 'Híbrido'
  }
  return labels[fuelType] || fuelType
}

async function refreshVehicles() {
  await vehiclesStore.fetchVehicles()
}

// Modal functions
function showVehicleDetails(vehicle: Vehicle) {
  selectedVehicle.value = vehicle
  showDetailModal.value = true
}

function closeVehicleDetail() {
  showDetailModal.value = false
  selectedVehicle.value = null
}

function editVehicle(vehicle: Vehicle) {
  // TODO: Implement edit functionality
  console.log('Edit vehicle:', vehicle)
  closeVehicleDetail()
}

// Lifecycle
onMounted(() => {
  vehiclesStore.fetchVehicles()
  driversStore.fetchDrivers()
})

// Export component options
defineComponent({
  components: {
    AdminLayout
  }
})
</script>
