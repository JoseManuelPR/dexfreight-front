<template>
  <Modal :full-screen-backdrop="true" @close="$emit('close')">
    <template #body>
      <div class="relative mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Editar Envío
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ shipment.trackingNumber }} • {{ shipment.origin.city }} → {{ shipment.destination.city }}
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
                      Número de Seguimiento *
                    </label>
                    <input
                      v-model="form.trackingNumber"
                      type="text"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="TRK123456789"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Estado *
                    </label>
                    <select
                      v-model="form.status"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    >
                      <option value="pending">Pendiente</option>
                      <option value="in_transit">En Tránsito</option>
                      <option value="delivered">Entregado</option>
                      <option value="cancelled">Cancelado</option>
                      <option value="delayed">Retrasado</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prioridad *
                    </label>
                    <select
                      v-model="form.priority"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                      <option value="urgent">Urgente</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Valor ({{ form.currency }}) *
                    </label>
                    <input
                      v-model.number="form.value"
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="1000.00"
                    />
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Dimensiones y Peso
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Peso (kg) *
                    </label>
                    <input
                      v-model.number="form.weight"
                      type="number"
                      required
                      min="0"
                      step="0.1"
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="50.5"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Volumen (m³) *
                    </label>
                    <input
                      v-model.number="form.volume"
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="2.5"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Fechas
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Recolección Programada *
                    </label>
                    <input
                      v-model="form.scheduledPickup"
                      type="datetime-local"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Entrega Estimada *
                    </label>
                    <input
                      v-model="form.estimatedDelivery"
                      type="datetime-local"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Recolección Real
                    </label>
                    <input
                      v-model="form.actualPickup"
                      type="datetime-local"
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Entrega Real
                    </label>
                    <input
                      v-model="form.actualDelivery"
                      type="datetime-local"
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Asignaciones
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Conductor
                    </label>
                    <select
                      v-model="form.driverId"
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

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Vehículo
                    </label>
                    <select
                      v-model="form.vehicleId"
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
              </div>
            </div>
          </div>

          <div class="mt-6 space-y-6">
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Direcciones
              </h3>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">Origen</h4>
                  <div class="space-y-3">
                    <input
                      v-model="form.origin.street"
                      type="text"
                      placeholder="Calle y número"
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <div class="grid grid-cols-2 gap-3">
                      <input
                        v-model="form.origin.city"
                        type="text"
                        placeholder="Ciudad"
                        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                      <input
                        v-model="form.origin.state"
                        type="text"
                        placeholder="Estado"
                        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                      <input
                        v-model="form.origin.zipCode"
                        type="text"
                        placeholder="Código Postal"
                        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                      <input
                        v-model="form.origin.country"
                        type="text"
                        placeholder="País"
                        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">Destino</h4>
                  <div class="space-y-3">
                    <input
                      v-model="form.destination.street"
                      type="text"
                      placeholder="Calle y número"
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <div class="grid grid-cols-2 gap-3">
                      <input
                        v-model="form.destination.city"
                        type="text"
                        placeholder="Ciudad"
                        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                      <input
                        v-model="form.destination.state"
                        type="text"
                        placeholder="Estado"
                        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                      <input
                        v-model="form.destination.zipCode"
                        type="text"
                        placeholder="Código Postal"
                        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                      <input
                        v-model="form.destination.country"
                        type="text"
                        placeholder="País"
                        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                    </div>
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
import type { Shipment, Driver, Vehicle } from '@/types/models'
import { useShipmentsStore } from '@/store'

interface Props {
  shipment: Shipment
  drivers?: Driver[]
  vehicles?: Vehicle[]
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'saved'])

const shipmentsStore = useShipmentsStore()
const saving = ref(false)

const form = ref({
  trackingNumber: '',
  status: 'pending' as Shipment['status'],
  priority: 'medium' as Shipment['priority'],
  value: 0,
  currency: 'PEN',
  weight: 0,
  volume: 0,
  scheduledPickup: '',
  estimatedDelivery: '',
  actualPickup: '',
  actualDelivery: '',
  driverId: '',
  vehicleId: '',
  origin: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  },
  destination: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  }
})

watch(() => props.shipment, (shipment) => {
  if (shipment) {
    form.value = {
      trackingNumber: shipment.trackingNumber,
      status: shipment.status,
      priority: shipment.priority,
      value: shipment.value,
      currency: shipment.currency,
      weight: shipment.weight,
      volume: shipment.volume,
      scheduledPickup: formatDateTimeForInput(shipment.scheduledPickup),
      estimatedDelivery: formatDateTimeForInput(shipment.estimatedDelivery),
      actualPickup: shipment.actualPickup ? formatDateTimeForInput(shipment.actualPickup) : '',
      actualDelivery: shipment.actualDelivery ? formatDateTimeForInput(shipment.actualDelivery) : '',
      driverId: shipment.driverId || '',
      vehicleId: shipment.vehicleId || '',
      origin: { ...shipment.origin },
      destination: { ...shipment.destination }
    }
  }
}, { immediate: true })

const availableDrivers = computed(() => {
  if (!props.drivers) return []

  return props.drivers.filter(driver => {
    if (driver.id === props.shipment.driverId) return true

    return driver.status === 'available'
  })
})

const availableVehicles = computed(() => {
  if (!props.vehicles) return []

  return props.vehicles.filter(vehicle => {
    if (vehicle.id === props.shipment.vehicleId) return true

    return vehicle.status === 'available'
  })
})

function formatDateTimeForInput(dateString: string): string {
  return new Date(dateString).toISOString().slice(0, 16)
}

async function handleSubmit() {
  saving.value = true

  try {
    const updateData = {
      ...form.value,
      scheduledPickup: new Date(form.value.scheduledPickup).toISOString(),
      estimatedDelivery: new Date(form.value.estimatedDelivery).toISOString(),
      actualPickup: form.value.actualPickup ? new Date(form.value.actualPickup).toISOString() : undefined,
      actualDelivery: form.value.actualDelivery ? new Date(form.value.actualDelivery).toISOString() : undefined,
      driverId: form.value.driverId || undefined,
      vehicleId: form.value.vehicleId || undefined
    }

    await shipmentsStore.updateShipment(props.shipment.id, updateData)
    emit('saved', props.shipment.id)
    emit('close')
  } catch (error) {
    console.error('Error updating shipment:', error)
  } finally {
    saving.value = false
  }
}
</script>
