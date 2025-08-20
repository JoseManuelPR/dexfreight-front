<template>
  <Modal :full-screen-backdrop="true" @close="$emit('close')">
    <template #body>
      <div class="relative mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Detalles del Envío
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ shipment.trackingNumber }}
            </p>
          </div>
          <div class="flex items-center gap-3">
            <Badge
              :color="getStatusColor(shipment.status)"
              variant="light"
              size="sm"
            >
              {{ getStatusLabel(shipment.status) }}
            </Badge>
            <button
              @click="$emit('close')"
              class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="p-6 max-h-[70vh] overflow-y-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="space-y-6">
              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Información General
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">ID:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ shipment.id }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Prioridad:</span>
                    <Badge
                      :color="getPriorityColor(shipment.priority)"
                      variant="light"
                      size="sm"
                    >
                      {{ getPriorityLabel(shipment.priority) }}
                    </Badge>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Peso:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ shipment.weight }} kg</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Volumen:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ shipment.volume }} m³</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Valor:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatCurrency(shipment.value) }}</span>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Información de Ruta
                </h3>
                <div class="space-y-4">
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white mb-1">Origen</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ shipment.origin.street }}<br>
                      {{ shipment.origin.city }}, {{ shipment.origin.state }}<br>
                      {{ shipment.origin.zipCode }}, {{ shipment.origin.country }}
                    </p>
                  </div>

                  <div class="flex items-center justify-center py-2">
                    <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                        </svg>
                        {{ shipment.route.distance }} km
                      </div>
                      <div class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                        </svg>
                        {{ formatDuration(shipment.route.estimatedTime) }}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white mb-1">Destino</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ shipment.destination.street }}<br>
                      {{ shipment.destination.city }}, {{ shipment.destination.state }}<br>
                      {{ shipment.destination.zipCode }}, {{ shipment.destination.country }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Cronología
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Creado:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDateTime(shipment.createdAt) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Recogida programada:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDateTime(shipment.scheduledPickup) }}</span>
                  </div>
                  <div v-if="shipment.actualPickup" class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Recogida real:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDateTime(shipment.actualPickup) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Entrega estimada:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDateTime(shipment.estimatedDelivery) }}</span>
                  </div>
                  <div v-if="shipment.actualDelivery" class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Entrega real:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDateTime(shipment.actualDelivery) }}</span>
                  </div>
                </div>
              </div>

            </div>

            <div class="space-y-6">
              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Información del Cliente
                </h3>
                <div class="space-y-3">
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ shipment.customer.name }}</p>
                    <p v-if="shipment.customer.company" class="text-sm text-gray-600 dark:text-gray-400">{{ shipment.customer.company }}</p>
                  </div>
                  <div class="space-y-1">
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ shipment.customer.email }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ shipment.customer.phone }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ shipment.customer.address.street }}<br>
                      {{ shipment.customer.address.city }}, {{ shipment.customer.address.state }}<br>
                      {{ shipment.customer.address.zipCode }}, {{ shipment.customer.address.country }}
                    </p>
                  </div>
                </div>
              </div>

              <div v-if="assignedDriver" class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Conductor Asignado
                </h3>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center">
                      <span class="text-sm font-medium text-white">
                        {{ assignedDriver.name.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900 dark:text-white">{{ assignedDriver.name }}</p>
                      <p class="text-xs text-gray-600 dark:text-gray-400">ID: {{ assignedDriver.id }}</p>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600 dark:text-gray-400">Teléfono:</span>
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ assignedDriver.phone }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ assignedDriver.email }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600 dark:text-gray-400">Licencia:</span>
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ assignedDriver.license }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600 dark:text-gray-400">Rating:</span>
                      <div class="flex items-center gap-1">
                        <span class="text-sm font-medium text-gray-900 dark:text-white">{{ assignedDriver.rating }}</span>
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600 dark:text-gray-400">Entregas:</span>
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ assignedDriver.onTimeDeliveries }}/{{ assignedDriver.totalDeliveries }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="assignedVehicle" class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Vehículo Asignado
                </h3>
                <div class="space-y-3">
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ assignedVehicle.brand }} {{ assignedVehicle.model }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ assignedVehicle.licensePlate }} • {{ assignedVehicle.year }}</p>
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600 dark:text-gray-400">Tipo:</span>
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getVehicleTypeLabel(assignedVehicle.type) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600 dark:text-gray-400">Capacidad:</span>
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ assignedVehicle.capacity.toLocaleString() }} kg</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600 dark:text-gray-400">Combustible:</span>
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getFuelTypeLabel(assignedVehicle.fuelType) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Mercancía
                </h3>
                <div class="space-y-3">
                  <div v-for="item in shipment.goods" :key="item.id" class="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                    <div class="flex justify-between items-start mb-2">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">{{ item.description }}</p>
                      <div class="flex gap-1">
                        <Badge v-if="item.fragile" color="warning" variant="light" size="sm">Frágil</Badge>
                        <Badge v-if="item.hazardous" color="error" variant="light" size="sm">Peligroso</Badge>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <div>Cantidad: {{ item.quantity }} {{ item.unit }}</div>
                      <div>Peso: {{ item.weight }} kg</div>
                      <div>Categoría: {{ item.category }}</div>
                      <div>Valor: {{ formatCurrency(item.value) }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Notas
                </h3>
                <div v-if="shipment.notes.length > 0" class="space-y-2">
                  <div
                    v-for="(note, index) in shipment.notes"
                    :key="index"
                    class="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600"
                  >
                    <p class="text-sm text-gray-700 dark:text-gray-300">{{ note }}</p>
                  </div>
                </div>
                <div v-else class="text-sm text-gray-500 dark:text-gray-400 italic">
                  No hay notas para este envío
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" size="sm" @click="$emit('close')">
            Cerrar
          </Button>
          <Button
            v-if="canEdit !== false"
            variant="primary"
            size="sm"
            @click="$emit('edit', shipment)"
          >
            Editar Envío
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import type { Shipment, Driver, Vehicle } from '@/types/models'

interface Props {
  shipment: Shipment
  drivers?: Driver[]
  vehicles?: Vehicle[]
  canEdit?: boolean
}

const props = defineProps<Props>()

defineEmits(['close', 'edit'])

const assignedDriver = computed(() => {
  if (!props.shipment.driverId || !props.drivers) return null

  return props.drivers.find(d => d.id === props.shipment.driverId) || null
})

const assignedVehicle = computed(() => {
  if (!props.shipment.vehicleId || !props.vehicles) return null

  return props.vehicles.find(v => v.id === props.shipment.vehicleId) || null
})

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

function getVehicleTypeLabel(type: string) {
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

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(value)
}

function formatDateTime(dateString: string) {
  return new Intl.DateTimeFormat('es-PE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString))
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours > 0) {
    return `${hours}h ${mins}m`
  }

  return `${mins}m`
}
</script>
