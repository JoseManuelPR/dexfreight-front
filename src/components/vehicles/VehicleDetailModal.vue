<template>
  <Modal :full-screen-backdrop="true" @close="$emit('close')">
    <template #body>
      <div class="relative mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Detalles del Vehículo
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ vehicle.brand }} {{ vehicle.model }} • {{ vehicle.licensePlate }}
            </p>
          </div>
          <div class="flex items-center gap-3">
            <Badge 
              :color="getStatusColor(vehicle.status)"
              variant="light"
              size="sm"
            >
              {{ getStatusLabel(vehicle.status) }}
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
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ vehicle.id }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Marca:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ vehicle.brand }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Modelo:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ vehicle.model }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Año:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ vehicle.year }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Placa:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ vehicle.licensePlate }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Tipo:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getTypeLabel(vehicle.type) }}</span>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Especificaciones
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Capacidad:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ vehicle.capacity.toLocaleString() }} kg</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Tipo de combustible:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getFuelTypeLabel(vehicle.fuelType) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Kilometraje:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ vehicle.mileage.toLocaleString() }} km</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">GPS:</span>
                    <div class="flex items-center gap-2">
                      <div class="flex items-center">
                        <div 
                          :class="[
                            'w-2 h-2 rounded-full mr-2',
                            vehicle.gpsEnabled ? 'bg-green-500' : 'bg-red-500'
                          ]"
                        ></div>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">
                          {{ vehicle.gpsEnabled ? 'Activo' : 'Inactivo' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Mantenimiento
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Último mantenimiento:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDate(vehicle.lastMaintenance) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Próximo mantenimiento:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDate(vehicle.nextMaintenance) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Días hasta mantenimiento:</span>
                    <span 
                      :class="[
                        'text-sm font-medium',
                        getDaysUntilMaintenance() <= 30 
                          ? 'text-red-600 dark:text-red-400' 
                          : getDaysUntilMaintenance() <= 60 
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-gray-900 dark:text-white'
                      ]"
                    >
                      {{ getDaysUntilMaintenance() }} días
                    </span>
                  </div>
                </div>
              </div>

            </div>

            <div class="space-y-6">
              
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
                      <span class="text-sm text-gray-600 dark:text-gray-400">Estado:</span>
                      <Badge 
                        :color="getDriverStatusColor(assignedDriver.status)"
                        variant="light"
                        size="sm"
                      >
                        {{ getDriverStatusLabel(assignedDriver.status) }}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Conductor Asignado
                </h3>
                <div class="text-center py-8">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    No hay conductor asignado
                  </p>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Documentación Legal
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Registro:</span>
                    <div class="flex items-center gap-2">
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDate(vehicle.registrationExpiry) }}</span>
                      <div 
                        :class="[
                          'w-2 h-2 rounded-full',
                          getExpirationStatus(vehicle.registrationExpiry) === 'expired' ? 'bg-red-500' :
                          getExpirationStatus(vehicle.registrationExpiry) === 'warning' ? 'bg-yellow-500' :
                          'bg-green-500'
                        ]"
                      ></div>
                    </div>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Seguro:</span>
                    <div class="flex items-center gap-2">
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDate(vehicle.insuranceExpiry) }}</span>
                      <div 
                        :class="[
                          'w-2 h-2 rounded-full',
                          getExpirationStatus(vehicle.insuranceExpiry) === 'expired' ? 'bg-red-500' :
                          getExpirationStatus(vehicle.insuranceExpiry) === 'warning' ? 'bg-yellow-500' :
                          'bg-green-500'
                        ]"
                      ></div>
                    </div>
                  </div>
                  <div class="mt-4 space-y-2">
                    <div v-if="getExpirationStatus(vehicle.registrationExpiry) !== 'valid'" class="flex items-center gap-2 text-xs">
                      <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="text-red-600 dark:text-red-400">
                        {{ getExpirationStatus(vehicle.registrationExpiry) === 'expired' ? 'Registro vencido' : 'Registro próximo a vencer' }}
                      </span>
                    </div>
                    <div v-if="getExpirationStatus(vehicle.insuranceExpiry) !== 'valid'" class="flex items-center gap-2 text-xs">
                      <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="text-red-600 dark:text-red-400">
                        {{ getExpirationStatus(vehicle.insuranceExpiry) === 'expired' ? 'Seguro vencido' : 'Seguro próximo a vencer' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Estadísticas
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Edad del vehículo:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getVehicleAge() }} años</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Km promedio/año:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getAverageKmPerYear().toLocaleString() }} km</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Eficiencia:</span>
                    <Badge 
                      :color="getEfficiencyColor()"
                      variant="light"
                      size="sm"
                    >
                      {{ getEfficiencyLabel() }}
                    </Badge>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" size="sm" @click="$emit('close')">
            Cerrar
          </Button>
          <Button variant="primary" size="sm" @click="$emit('edit', vehicle)">
            Editar Vehículo
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
import type { Vehicle, Driver } from '@/types/models'

interface Props {
  vehicle: Vehicle
  drivers?: Driver[]
}

const props = defineProps<Props>()

defineEmits(['close', 'edit'])

const assignedDriver = computed(() => {
  if (!props.vehicle.currentDriverId || !props.drivers) return null
  return props.drivers.find(d => d.id === props.vehicle.currentDriverId) || null
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

function getDriverStatusColor(status: string) {
  const colors: Record<string, string> = {
    available: 'success',
    'on-delivery': 'primary',
    'off-duty': 'warning',
    suspended: 'error'
  }
  return colors[status] || 'light'
}

function getDriverStatusLabel(status: string) {
  const labels: Record<string, string> = {
    available: 'Disponible',
    'on-delivery': 'En Entrega',
    'off-duty': 'Fuera de Servicio',
    suspended: 'Suspendido'
  }
  return labels[status] || status
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('es-PE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(dateString))
}

function getDaysUntilMaintenance() {
  const nextMaintenance = new Date(props.vehicle.nextMaintenance)
  const today = new Date()
  const diffTime = nextMaintenance.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

function getExpirationStatus(dateString: string) {
  const expiryDate = new Date(dateString)
  const today = new Date()
  const diffTime = expiryDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'expired'
  if (diffDays <= 30) return 'warning'
  return 'valid'
}

function getVehicleAge() {
  const currentYear = new Date().getFullYear()
  return currentYear - props.vehicle.year
}

function getAverageKmPerYear() {
  const age = getVehicleAge()
  if (age === 0) return props.vehicle.mileage
  return Math.round(props.vehicle.mileage / age)
}

function getEfficiencyColor() {
  const avgKmPerYear = getAverageKmPerYear()
  if (avgKmPerYear < 20000) return 'success'
  if (avgKmPerYear < 40000) return 'warning'
  return 'error'
}

function getEfficiencyLabel() {
  const avgKmPerYear = getAverageKmPerYear()
  if (avgKmPerYear < 20000) return 'Excelente'
  if (avgKmPerYear < 40000) return 'Buena'
  return 'Intensiva'
}
</script>
