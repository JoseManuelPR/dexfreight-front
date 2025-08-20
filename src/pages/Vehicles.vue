<template>
  <admin-layout>
    <div class="space-y-6">
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
            variant="primary"
            size="sm"
            :start-icon="PlusIcon"
            @click="showAddModal = true"
            :disabled="loading"
          >
            Agregar Vehículo
          </Button>
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

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

      <!-- Explanation of vehicle statuses -->
      <div class="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div>
            <h4 class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
              Información sobre los estados de vehículos
            </h4>
            <p class="text-sm text-blue-700 dark:text-blue-300">
              <strong>Disponibles:</strong> Vehículos que no están asignados a un conductor.
              <strong>En Uso:</strong> Vehículos que ya están asignados a un conductor.
              Estos estados se refieren únicamente a la asignación de conductores, no al estado de los envíos.
            </p>
          </div>
        </div>
      </div>

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

            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Envíos:</span>
              <span class="font-medium text-gray-900 dark:text-white">
                {{ getVehicleShipmentsCount(vehicle) }} envíos
              </span>
            </div>
          </div>

          <div v-if="needsDriverUrgently(vehicle)" class="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                ¡Asignar conductor urgente!
              </span>
            </div>
            <p class="text-xs text-yellow-700 dark:text-yellow-300 mt-1 ml-6">
              Este vehículo tiene envíos asignados pero no tiene conductor
            </p>
          </div>

          <div class="mt-6 flex items-center gap-2">
            <Button variant="outline" size="sm" class="flex-1" @click="showVehicleDetails(vehicle)">
              Ver Detalles
            </Button>
            <Button
              v-if="canDeleteVehicle(vehicle)"
              variant="outline"
              size="sm"
              className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20"
              @click="confirmDeleteVehicle(vehicle)"
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>

    <VehicleDetailModal
      v-if="showDetailModal && selectedVehicle"
      :vehicle="selectedVehicle"
      :drivers="drivers"
      @close="closeVehicleDetail"
      @edit="editVehicle"
    />

    <VehicleEditModal
      v-if="showEditModal && selectedVehicle"
      :vehicle="selectedVehicle"
      :drivers="drivers"
      @close="closeEditModal"
      @saved="handleVehicleSaved"
    />

    <VehicleAddModal
      v-if="showAddModal"
      :drivers="drivers"
      @close="closeAddModal"
      @saved="handleVehicleCreated"
    />

    <NotificationAlert
      :show="showSuccessAlert"
      variant="success"
      title="¡Operación exitosa!"
      message="El vehículo ha sido procesado exitosamente."
    />

    <NotificationAlert
      :show="showDeleteAlert"
      variant="success"
      title="¡Vehículo eliminado!"
      message="El vehículo ha sido eliminado exitosamente."
    />

    <NotificationAlert
      :show="showErrorAlert"
      variant="error"
      title="Error"
      :message="errorMessage"
    />

    <div class="mt-6">
      <Alert
        variant="warning"
        title="Política de Eliminación de Vehículos"
        message="Solo se pueden eliminar vehículos que no tengan envíos en tránsito o pendientes. Los vehículos con envíos activos no pueden ser eliminados por razones de seguridad y trazabilidad."
      />
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import NotificationAlert from '@/components/ui/NotificationAlert.vue'
import Alert from '@/components/ui/Alert.vue'
import VehicleDetailModal from '@/components/vehicles/VehicleDetailModal.vue'
import VehicleEditModal from '@/components/vehicles/VehicleEditModal.vue'
import VehicleAddModal from '@/components/vehicles/VehicleAddModal.vue'
import { useVehiclesStore, useDriversStore, useShipmentsStore } from '@/store'
import type { Vehicle } from '@/types/models'
import RefreshIcon from '@/icons/RefreshIcon.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import BoxIcon from '@/icons/BoxIcon.vue'
import CheckIcon from '@/icons/CheckIcon.vue'
import WarningIcon from '@/icons/WarningIcon.vue'

const vehiclesStore = useVehiclesStore()
const driversStore = useDriversStore()
const shipmentsStore = useShipmentsStore()

const searchTerm = ref('')
const statusFilter = ref('')
const typeFilter = ref('')

const showDetailModal = ref(false)
const showEditModal = ref(false)
const showAddModal = ref(false)
const selectedVehicle = ref<Vehicle | null>(null)
const showSuccessAlert = ref(false)
const showDeleteAlert = ref(false)
const showErrorAlert = ref(false)
const errorMessage = ref('')

const loading = computed(() => vehiclesStore.loading)
const vehicles = computed(() => vehiclesStore.vehicles)
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

function canDeleteVehicle(vehicle: Vehicle): boolean {
  const activeShipments = shipmentsStore.shipments.filter(shipment =>
    shipment.vehicleId === vehicle.id &&
    (shipment.status === 'in_transit' || shipment.status === 'pending')
  )

  return activeShipments.length === 0
}

function getVehicleShipmentsCount(vehicle: Vehicle): number {
  return shipmentsStore.shipments.filter(shipment => shipment.vehicleId === vehicle.id).length
}

function needsDriverUrgently(vehicle: Vehicle): boolean {
  if (!shipmentsStore.shipments || shipmentsStore.shipments.length === 0) {
    return false
  }

  const vehicleShipments = shipmentsStore.shipments.filter(shipment => shipment.vehicleId === vehicle.id)
  const hasShipments = vehicleShipments.length > 0
  const isAvailable = vehicle.status === 'available'
  const noDriver = vehicle.currentDriverId === null || vehicle.currentDriverId === undefined

  return isAvailable && noDriver && hasShipments
}

async function refreshVehicles() {
  await Promise.all([
    vehiclesStore.fetchVehicles(),
    driversStore.fetchDrivers(),
    shipmentsStore.fetchShipments()
  ])
}

function showVehicleDetails(vehicle: Vehicle) {
  selectedVehicle.value = vehicle
  showDetailModal.value = true
}

function closeVehicleDetail() {
  showDetailModal.value = false
  selectedVehicle.value = null
}

function editVehicle(vehicle: Vehicle) {
  closeVehicleDetail()
  selectedVehicle.value = vehicle
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
  selectedVehicle.value = null
}

function closeAddModal() {
  showAddModal.value = false
}

function handleVehicleSaved() {
  vehiclesStore.fetchVehicles()

  showSuccessAlert.value = true

  setTimeout(() => {
    showSuccessAlert.value = false
  }, 3000)
}

function handleVehicleCreated() {
  vehiclesStore.fetchVehicles()

  showSuccessAlert.value = true

  setTimeout(() => {
    showSuccessAlert.value = false
  }, 3000)
}

async function confirmDeleteVehicle(vehicle: Vehicle) {
  if (confirm(`¿Estás seguro de que deseas eliminar el vehículo ${vehicle.licensePlate}? Esta acción no se puede deshacer.`)) {
    try {
      await vehiclesStore.deleteVehicle(vehicle.id)

      showDeleteAlert.value = true
      setTimeout(() => {
        showDeleteAlert.value = false
      }, 3000)
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Error al eliminar el vehículo'
      showErrorAlert.value = true
      setTimeout(() => {
        showErrorAlert.value = false
      }, 5000)
    }
  }
}

onMounted(() => {
  Promise.all([
    vehiclesStore.fetchVehicles(),
    driversStore.fetchDrivers(),
    shipmentsStore.fetchShipments()
  ])
})

defineComponent({
  components: {
    AdminLayout
  }
})
</script>
