<template>
  <Modal :full-screen-backdrop="true" @close="$emit('close')">
    <template #body>
      <div class="relative mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Editar Conductor
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ driver.name }} • {{ driver.license }}
            </p>
          </div>
          <button
            @click="$emit('close')"
            class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6 max-h-[70vh] overflow-y-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Información Personal -->
            <div class="space-y-6">
              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Información Personal
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      v-model="form.email"
                      type="email"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="juan@example.com"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Teléfono *
                    </label>
                    <input
                      v-model="form.phone"
                      type="tel"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="123456789"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Número de Licencia *
                    </label>
                    <input
                      v-model="form.license"
                      type="text"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="ABC123"
                    />
                  </div>
                </div>
              </div>

              <!-- Estado y Estadísticas -->
              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Estado y Estadísticas
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Estado *
                    </label>
                    <select
                      v-model="form.status"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    >
                      <option value="available">Disponible</option>
                      <option value="on-delivery">En Entrega</option>
                      <option value="off-duty">Fuera de Servicio</option>
                      <option value="suspended">Suspendido</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rating *
                    </label>
                    <input
                      v-model.number="form.rating"
                      type="number"
                      required
                      min="0"
                      max="5"
                      step="0.1"
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="4.5"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Vehículo Asignado y Estadísticas -->
            <div class="space-y-6">
              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Vehículo Asignado
                </h3>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Vehículo
                  </label>
                  <select
                    v-model="form.currentVehicle"
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="">Sin asignar</option>
                    <option
                      v-for="vehicle in availableVehicles"
                      :key="vehicle.id"
                      :value="vehicle.id"
                    >
                      {{ vehicle.brand }} {{ vehicle.model }} ({{ vehicle.licensePlate }})
                    </option>
                  </select>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Estadísticas de Entrega
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Total de Entregas *
                    </label>
                    <input
                      v-model.number="form.totalDeliveries"
                      type="number"
                      required
                      min="0"
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="150"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Entregas a Tiempo *
                    </label>
                    <input
                      v-model.number="form.onTimeDeliveries"
                      type="number"
                      required
                      min="0"
                      :max="form.totalDeliveries"
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="140"
                    />
                  </div>

                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Porcentaje de éxito:</span>
                    <span class="font-medium text-gray-900 dark:text-white">
                      {{ getSuccessPercentage() }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            size="sm"
            @click="$emit('close')"
            :disabled="saving"
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="sm"
            @click="handleSubmit"
            :disabled="saving"
            :loading="saving"
          >
            {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import Button from '@/components/ui/Button.vue'
import type { Driver, Vehicle } from '@/types/models'
import { useDriversStore } from '@/store'

interface Props {
  driver: Driver
  vehicles?: Vehicle[]
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'saved'])

const driversStore = useDriversStore()
const saving = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: '',
  license: '',
  status: 'available' as Driver['status'],
  rating: 0,
  currentVehicle: '',
  totalDeliveries: 0,
  onTimeDeliveries: 0
})

watch(() => props.driver, (driver) => {
  if (driver) {
    form.value = {
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      license: driver.license,
      status: driver.status,
      rating: driver.rating,
      currentVehicle: driver.currentVehicle || '',
      totalDeliveries: driver.totalDeliveries,
      onTimeDeliveries: driver.onTimeDeliveries
    }
  }
}, { immediate: true })

const availableVehicles = computed(() => {
  if (!props.vehicles) return []

  return props.vehicles.filter(vehicle => {
    if (vehicle.id === props.driver.currentVehicle) return true

    return !vehicle.currentDriverId
  })
})

function getSuccessPercentage(): number {
  if (form.value.totalDeliveries === 0) return 0

  return Math.round((form.value.onTimeDeliveries / form.value.totalDeliveries) * 100)
}

async function handleSubmit() {
  saving.value = true

  try {
    const updateData = {
      ...form.value,
      currentVehicle: form.value.currentVehicle || undefined
    }

    await driversStore.updateDriver(props.driver.id, updateData)
    emit('saved', props.driver.id)
    emit('close')
  } catch (error) {
    console.error('Error updating driver:', error)
  } finally {
    saving.value = false
  }
}
</script>
