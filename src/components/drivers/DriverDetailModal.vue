<template>
  <Modal :full-screen-backdrop="true" @close="$emit('close')">
    <template #body>
      <div class="relative mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Detalles del Conductor
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ driver.name }} • ID: {{ driver.id }}
            </p>
          </div>
          <div class="flex items-center gap-3">
            <Badge 
              :color="getStatusColor(driver.status)"
              variant="light"
              size="sm"
            >
              {{ getStatusLabel(driver.status) }}
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
                  Información Personal
                </h3>
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span class="text-xl font-bold text-white">
                      {{ getInitials(driver.name) }}
                    </span>
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">{{ driver.name }}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Conductor Profesional</p>
                  </div>
                </div>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">ID:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ driver.id }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Licencia:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ driver.license }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ driver.email }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Teléfono:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ driver.phone }}</span>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Calificación de Rendimiento
                </h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Calificación general:</span>
                    <div class="flex items-center gap-2">
                      <div class="flex items-center">
                        <svg
                          v-for="i in 5"
                          :key="i"
                          :class="[
                            'w-4 h-4',
                            i <= Math.floor(driver.rating) ? 'text-yellow-400' : 'text-gray-300'
                          ]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                      <span class="text-sm font-bold text-gray-900 dark:text-white">{{ driver.rating }}</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Nivel de rendimiento:</span>
                    <Badge 
                      :color="getPerformanceColor()"
                      variant="light"
                      size="sm"
                    >
                      {{ getPerformanceLevel() }}
                    </Badge>
                  </div>

                  <div class="space-y-2">
                    <div class="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>Progreso de calificación</span>
                      <span>{{ driver.rating }}/5.0</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        :class="[
                          'h-2 rounded-full transition-all duration-300',
                          driver.rating >= 4.5 ? 'bg-green-500' :
                          driver.rating >= 4.0 ? 'bg-blue-500' :
                          driver.rating >= 3.5 ? 'bg-yellow-500' : 'bg-red-500'
                        ]"
                        :style="{ width: (driver.rating / 5) * 100 + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Estadísticas de Entregas
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Total de entregas:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ driver.totalDeliveries.toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Entregas a tiempo:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ driver.onTimeDeliveries.toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Entregas tardías:</span>
                    <span class="text-sm font-medium text-red-600 dark:text-red-400">{{ getLateDeliveries().toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Porcentaje de puntualidad:</span>
                    <div class="flex items-center gap-2">
                      <span 
                        :class="[
                          'text-sm font-medium',
                          getOnTimePercentage() >= 95 ? 'text-green-600 dark:text-green-400' :
                          getOnTimePercentage() >= 90 ? 'text-blue-600 dark:text-blue-400' :
                          getOnTimePercentage() >= 80 ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-red-600 dark:text-red-400'
                        ]"
                      >
                        {{ getOnTimePercentage() }}%
                      </span>
                      <Badge 
                        :color="getPunctualityColor()"
                        variant="light"
                        size="sm"
                      >
                        {{ getPunctualityLabel() }}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div class="mt-4 space-y-2">
                  <div class="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>Entregas a tiempo</span>
                    <span>{{ getOnTimePercentage() }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      :class="[
                        'h-2 rounded-full transition-all duration-300',
                        getOnTimePercentage() >= 95 ? 'bg-green-500' :
                        getOnTimePercentage() >= 90 ? 'bg-blue-500' :
                        getOnTimePercentage() >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                      ]"
                      :style="{ width: getOnTimePercentage() + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

            </div>

            <div class="space-y-6">
              <div v-if="assignedVehicle" class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Vehículo Asignado
                </h3>
                <div class="space-y-3">
                  <div class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8 3.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">{{ assignedVehicle.brand }} {{ assignedVehicle.model }}</p>
                      <p class="text-xs text-gray-600 dark:text-gray-400">{{ assignedVehicle.licensePlate }}</p>
                    </div>
                    <Badge 
                      :color="getVehicleStatusColor(assignedVehicle.status)"
                      variant="light"
                      size="sm"
                    >
                      {{ getVehicleStatusLabel(assignedVehicle.status) }}
                    </Badge>
                  </div>
                  <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Tipo:</span>
                      <span class="font-medium text-gray-900 dark:text-white">{{ getVehicleTypeLabel(assignedVehicle.type) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Capacidad:</span>
                      <span class="font-medium text-gray-900 dark:text-white">{{ assignedVehicle.capacity.toLocaleString() }} kg</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Año:</span>
                      <span class="font-medium text-gray-900 dark:text-white">{{ assignedVehicle.year }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600 dark:text-gray-400">Kilometraje:</span>
                      <span class="font-medium text-gray-900 dark:text-white">{{ assignedVehicle.mileage.toLocaleString() }} km</span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Vehículo Asignado
                </h3>
                <div class="text-center py-8">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
                  <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    No hay vehículo asignado
                  </p>
                  <p class="text-xs text-gray-400 dark:text-gray-500">
                    El conductor está disponible para asignación
                  </p>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Estado Actual
                </h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Estado:</span>
                    <Badge 
                      :color="getStatusColor(driver.status)"
                      variant="light"
                      size="sm"
                    >
                      {{ getStatusLabel(driver.status) }}
                    </Badge>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Disponibilidad:</span>
                    <div class="flex items-center gap-2">
                      <div 
                        :class="[
                          'w-2 h-2 rounded-full',
                          driver.status === 'available' ? 'bg-green-500' : 
                          driver.status === 'on-delivery' ? 'bg-blue-500' : 
                          driver.status === 'off-duty' ? 'bg-yellow-500' : 'bg-red-500'
                        ]"
                      ></div>
                      <span class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ getAvailabilityLabel() }}
                      </span>
                    </div>
                  </div>
                  <div v-if="driver.status === 'on-delivery'" class="flex items-center justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">En servicio desde:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">Hoy, 08:30</span>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Experiencia y Logros
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Experiencia estimada:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getExperienceLevel() }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Entregas por mes:</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ getMonthlyDeliveries() }}</span>
                  </div>
                  
                  <div class="mt-4">
                    <p class="text-sm font-medium text-gray-900 dark:text-white mb-2">Logros:</p>
                    <div class="flex flex-wrap gap-2">
                      <Badge v-if="driver.rating >= 4.8" color="success" variant="light" size="sm">
                        ⭐ Conductor Estrella
                      </Badge>
                      <Badge v-if="getOnTimePercentage() >= 95" color="primary" variant="light" size="sm">
                        🎯 Puntualidad Perfecta
                      </Badge>
                      <Badge v-if="driver.totalDeliveries >= 100" color="warning" variant="light" size="sm">
                        🏆 Veterano (100+ entregas)
                      </Badge>
                      <Badge v-if="driver.totalDeliveries >= 200" color="error" variant="light" size="sm">
                        👑 Experto (200+ entregas)
                      </Badge>
                    </div>
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
          <Button variant="primary" size="sm" @click="$emit('edit', driver)">
            Editar Conductor
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
import type { Driver, Vehicle } from '@/types/models'

interface Props {
  driver: Driver
  vehicles?: Vehicle[]
}

const props = defineProps<Props>()

defineEmits(['close', 'edit'])

const assignedVehicle = computed(() => {
  if (!props.driver.currentVehicle || !props.vehicles) return null
  return props.vehicles.find(v => v.id === props.driver.currentVehicle) || null
})

function getInitials(name: string) {
  return name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase()
}

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    available: 'success',
    'on-delivery': 'primary',
    'off-duty': 'warning',
    suspended: 'error'
  }
  return colors[status] || 'light'
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    available: 'Disponible',
    'on-delivery': 'En Entrega',
    'off-duty': 'Fuera de Servicio',
    suspended: 'Suspendido'
  }
  return labels[status] || status
}

function getVehicleStatusColor(status: string) {
  const colors: Record<string, string> = {
    available: 'success',
    'in-use': 'primary',
    maintenance: 'warning',
    offline: 'error'
  }
  return colors[status] || 'light'
}

function getVehicleStatusLabel(status: string) {
  const labels: Record<string, string> = {
    available: 'Disponible',
    'in-use': 'En Uso',
    maintenance: 'Mantenimiento',
    offline: 'Fuera de Línea'
  }
  return labels[status] || status
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

function getLateDeliveries() {
  return props.driver.totalDeliveries - props.driver.onTimeDeliveries
}

function getOnTimePercentage() {
  if (props.driver.totalDeliveries === 0) return 0
  return Math.round((props.driver.onTimeDeliveries / props.driver.totalDeliveries) * 100)
}

function getPerformanceColor() {
  if (props.driver.rating >= 4.5) return 'success'
  if (props.driver.rating >= 4.0) return 'primary'
  if (props.driver.rating >= 3.5) return 'warning'
  return 'error'
}

function getPerformanceLevel() {
  if (props.driver.rating >= 4.8) return 'Excepcional'
  if (props.driver.rating >= 4.5) return 'Excelente'
  if (props.driver.rating >= 4.0) return 'Muy Bueno'
  if (props.driver.rating >= 3.5) return 'Bueno'
  return 'Necesita Mejora'
}

function getPunctualityColor() {
  const percentage = getOnTimePercentage()
  if (percentage >= 95) return 'success'
  if (percentage >= 90) return 'primary'
  if (percentage >= 80) return 'warning'
  return 'error'
}

function getPunctualityLabel() {
  const percentage = getOnTimePercentage()
  if (percentage >= 95) return 'Excelente'
  if (percentage >= 90) return 'Muy Bueno'
  if (percentage >= 80) return 'Bueno'
  return 'Mejorable'
}

function getAvailabilityLabel() {
  switch (props.driver.status) {
    case 'available': return 'Listo para asignación'
    case 'on-delivery': return 'Ocupado en entrega'
    case 'off-duty': return 'Fuera de horario'
    case 'suspended': return 'Temporalmente inactivo'
    default: return 'Estado desconocido'
  }
}

function getExperienceLevel() {
  if (props.driver.totalDeliveries >= 200) return 'Experto (3+ años)'
  if (props.driver.totalDeliveries >= 100) return 'Experimentado (2+ años)'
  if (props.driver.totalDeliveries >= 50) return 'Intermedio (1+ año)'
  return 'Principiante (<1 año)'
}

function getMonthlyDeliveries() {
  const monthlyAvg = Math.round(props.driver.totalDeliveries / 12)
  return `~${monthlyAvg} entregas/mes`
}
</script>
