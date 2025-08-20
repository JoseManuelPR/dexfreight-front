<template>
  <Modal :full-screen-backdrop="true" @close="$emit('close')">
    <template #body>
      <div class="relative mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Agregar Nuevo Envío
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Completa la información del nuevo envío
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
                      Moneda *
                    </label>
                    <select
                      v-model="form.currency"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    >
                      <option value="PEN">PEN (Soles)</option>
                      <option value="USD">USD (Dólares)</option>
                      <option value="EUR">EUR (Euros)</option>
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

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Cliente
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nombre del Cliente *
                    </label>
                    <input
                      v-model="form.customer.name"
                      type="text"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email del Cliente *
                    </label>
                    <input
                      v-model="form.customer.email"
                      type="email"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="juan@example.com"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Teléfono del Cliente *
                    </label>
                    <input
                      v-model="form.customer.phone"
                      type="tel"
                      required
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="+51 123 456 789"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Empresa (Opcional)
                    </label>
                    <input
                      v-model="form.customer.company"
                      type="text"
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      placeholder="Empresa S.A."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notas -->
          <div class="mt-6 space-y-6">
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Notas
              </h3>
              <div class="space-y-4">
                <div v-if="form.notes.length > 0" class="space-y-2">
                  <div
                    v-for="(note, index) in form.notes"
                    :key="index"
                    class="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600"
                  >
                    <span class="flex-1 text-sm text-gray-700 dark:text-gray-300">{{ note }}</span>
                    <button
                      type="button"
                      @click="removeNote(index)"
                      class="p-1 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="flex gap-2">
                  <input
                    v-model="newNote"
                    type="text"
                    placeholder="Agregar una nota..."
                    class="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    @keyup.enter="addNote"
                  />
                  <button
                    type="button"
                    @click="addNote"
                    :disabled="!newNote.trim()"
                    class="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>

            <!-- Direcciones -->
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Dirección de Origen *
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Calle
                  </label>
                  <input
                    v-model="form.origin.street"
                    type="text"
                    required
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="Av. Principal 123"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ciudad
                  </label>
                  <input
                    v-model="form.origin.city"
                    type="text"
                    required
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="Lima"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estado/Provincia
                  </label>
                  <input
                    v-model="form.origin.state"
                    type="text"
                    required
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="Lima"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Código Postal
                  </label>
                  <input
                    v-model="form.origin.zipCode"
                    type="text"
                    required
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="15001"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    País
                  </label>
                  <input
                    v-model="form.origin.country"
                    type="text"
                    required
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="Perú"
                  />
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Dirección de Destino *
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Calle
                  </label>
                  <input
                    v-model="form.destination.street"
                    type="text"
                    required
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="Av. Secundaria 456"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ciudad
                  </label>
                  <input
                    v-model="form.destination.city"
                    type="text"
                    required
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="Arequipa"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estado/Provincia
                  </label>
                  <input
                    v-model="form.destination.state"
                    type="text"
                    required
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="Arequipa"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Código Postal
                  </label>
                  <input
                    v-model="form.destination.zipCode"
                    type="text"
                    required
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="04001"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    País
                  </label>
                  <input
                    v-model="form.destination.country"
                    type="text"
                    required
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="Perú"
                  />
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
            :disabled="saving || !isFormValid"
            :loading="saving"
          >
            {{ saving ? 'Creando...' : 'Crear Envío' }}
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
import type { Shipment, Driver, Vehicle, Address } from '@/types/models'

// Type for creating a shipment without IDs
type CreateShipmentData = any
import { useShipmentsStore } from '@/store'

interface Props {
  drivers?: Driver[]
  vehicles?: Vehicle[]
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'saved'])

const shipmentsStore = useShipmentsStore()
const saving = ref(false)
const newNote = ref('')

function getCurrentDateTimeLocal(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}`
}

function getDateTimeIn2Days(): string {
  const future = new Date()

  future.setDate(future.getDate() + 2)
  const year = future.getFullYear()
  const month = String(future.getMonth() + 1).padStart(2, '0')
  const day = String(future.getDate()).padStart(2, '0')
  const hours = String(future.getHours()).padStart(2, '0')
  const minutes = String(future.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}`
}

const form = ref({
  trackingNumber: '',
  status: 'pending' as Shipment['status'],
  priority: 'medium' as Shipment['priority'],
  currency: 'PEN',
  value: 0,
  weight: 0,
  volume: 0,
  scheduledPickup: getCurrentDateTimeLocal(),
  estimatedDelivery: getDateTimeIn2Days(),
  driverId: '',
  vehicleId: '',
  customer: {
    name: '',
    email: '',
    phone: '',
    company: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Perú'
    },
    accountType: 'individual' as const
  },
  origin: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Perú'
  } as Address,
  destination: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Perú'
  } as Address,
  goods: [] as any[],
  route: {
    distance: 0,
    estimatedTime: 0
  },
  notes: [] as string[]
})

const availableDrivers = computed(() => {
  if (!props.drivers) return []

  return props.drivers.filter(driver => {
    return driver.status === 'available'
  })
})

const availableVehicles = computed(() => {
  if (!props.vehicles) return []

  return props.vehicles.filter(vehicle => {
    return vehicle.status === 'available'
  })
})

const isFormValid = computed(() => {
  return form.value.trackingNumber.trim() !== '' &&
        form.value.customer.name.trim() !== '' &&
        form.value.customer.email.trim() !== '' &&
        form.value.customer.phone.trim() !== '' &&
        form.value.origin.street.trim() !== '' &&
        form.value.origin.city.trim() !== '' &&
        form.value.origin.state.trim() !== '' &&
        form.value.origin.zipCode.trim() !== '' &&
        form.value.origin.country.trim() !== '' &&
        form.value.destination.street.trim() !== '' &&
        form.value.destination.city.trim() !== '' &&
        form.value.destination.state.trim() !== '' &&
        form.value.destination.zipCode.trim() !== '' &&
        form.value.destination.country.trim() !== '' &&
        form.value.weight > 0 &&
        form.value.volume > 0 &&
        form.value.value > 0
})

function addNote() {
  if (newNote.value.trim()) {
    form.value.notes.push(newNote.value.trim())
    newNote.value = ''
  }
}

function removeNote(index: number) {
  form.value.notes.splice(index, 1)
}

async function handleSubmit() {
  if (!isFormValid.value) return

  saving.value = true

  try {
    const createData: CreateShipmentData = {
      ...form.value,
      driverId: form.value.driverId || undefined,
      vehicleId: form.value.vehicleId || undefined,
      scheduledPickup: new Date(form.value.scheduledPickup).toISOString(),
      estimatedDelivery: new Date(form.value.estimatedDelivery).toISOString()
    }

    const newShipment = await shipmentsStore.createShipment(createData)

    emit('saved', newShipment.id)
    emit('close')
  } catch (error) {
    console.error('Error creating shipment:', error)
  } finally {
    saving.value = false
  }
}
</script>
