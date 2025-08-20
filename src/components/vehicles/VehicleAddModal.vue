<template>
  <Modal :full-screen-backdrop="true" @close="$emit('close')">
    <template #body>
      <div class="relative mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Agregar Nuevo Vehículo
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Completa la información del nuevo vehículo
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
            <div class="space-y-6">
              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Información General
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Marca *
                    </label>
                    <input
                      v-model="form.brand"
                      type="text"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="Ej: Mercedes-Benz"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Modelo *
                    </label>
                    <input
                      v-model="form.model"
                      type="text"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="Ej: Actros"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Año *
                    </label>
                    <input
                      v-model.number="form.year"
                      type="number"
                      required
                      min="1900"
                      :max="new Date().getFullYear() + 1"
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="2022"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Placa *
                    </label>
                    <input
                      v-model="form.licensePlate"
                      type="text"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="ABC-123"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tipo de Vehículo *
                    </label>
                    <select
                      v-model="form.type"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    >
                      <option value="truck">Camión</option>
                      <option value="van">Camioneta</option>
                      <option value="trailer">Tráiler</option>
                      <option value="pickup">Pickup</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Especificaciones
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Capacidad (kg) *
                    </label>
                    <input
                      v-model.number="form.capacity"
                      type="number"
                      required
                      min="0"
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="5000"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tipo de Combustible *
                    </label>
                    <select
                      v-model="form.fuelType"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    >
                      <option value="diesel">Diésel</option>
                      <option value="gasoline">Gasolina</option>
                      <option value="electric">Eléctrico</option>
                      <option value="hybrid">Híbrido</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Kilometraje (km) *
                    </label>
                    <input
                      v-model.number="form.mileage"
                      type="number"
                      required
                      min="0"
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="45000"
                    />
                  </div>

                  <div class="flex items-center">
                    <input
                      v-model="form.gpsEnabled"
                      type="checkbox"
                      id="gps-enabled"
                      class="h-4 w-4 text-brand-500 focus:ring-brand-500 border-gray-300 rounded"
                    />
                    <label for="gps-enabled" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      GPS Habilitado
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Estado y Mantenimiento
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
                      <option value="in-use">En Uso</option>
                      <option value="maintenance">Mantenimiento</option>
                      <option value="offline">Fuera de Línea</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Último Mantenimiento *
                    </label>
                    <input
                      v-model="form.lastMaintenance"
                      type="date"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Próximo Mantenimiento *
                    </label>
                    <input
                      v-model="form.nextMaintenance"
                      type="date"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Documentación Legal
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Vencimiento de Registro *
                    </label>
                    <input
                      v-model="form.registrationExpiry"
                      type="date"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Vencimiento de Seguro *
                    </label>
                    <input
                      v-model="form.insuranceExpiry"
                      type="date"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Conductor Asignado
                </h3>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Conductor
                  </label>
                  <select
                    v-model="form.currentDriverId"
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="">Sin asignar</option>
                    <option
                      v-for="driver in availableDrivers"
                      :key="driver.id"
                      :value="driver.id"
                    >
                      {{ driver.name }} ({{ driver.license }})
                    </option>
                  </select>
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
            {{ saving ? 'Creando...' : 'Crear Vehículo' }}
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import Button from '@/components/ui/Button.vue'
import type { Vehicle, Driver } from '@/types/models'
import { useVehiclesStore } from '@/store'

interface Props {
  drivers?: Driver[]
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'saved'])

const vehiclesStore = useVehiclesStore()
const saving = ref(false)

const form = ref({
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  licensePlate: '',
  type: 'truck' as Vehicle['type'],
  capacity: 0,
  fuelType: 'diesel' as Vehicle['fuelType'],
  status: 'available' as Vehicle['status'],
  mileage: 0,
  lastMaintenance: new Date().toISOString().split('T')[0],
  nextMaintenance: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 6 months from now
  registrationExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
  insuranceExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
  currentDriverId: '',
  gpsEnabled: false
})

const availableDrivers = computed(() => {
  if (!props.drivers) return []

  return props.drivers.filter(driver => {
    return driver.status === 'available' && !driver.currentVehicle
  })
})

async function handleSubmit() {
  saving.value = true

  try {
    const createData = {
      ...form.value,
      lastMaintenance: new Date(form.value.lastMaintenance).toISOString(),
      nextMaintenance: new Date(form.value.nextMaintenance).toISOString(),
      registrationExpiry: new Date(form.value.registrationExpiry).toISOString(),
      insuranceExpiry: new Date(form.value.insuranceExpiry).toISOString(),
      currentDriverId: form.value.currentDriverId || undefined
    }

    const newVehicle = await vehiclesStore.createVehicle(createData)

    emit('saved', newVehicle.id)
    emit('close')
  } catch (error) {
    console.error('Error creating vehicle:', error)
  } finally {
    saving.value = false
  }
}
</script>
