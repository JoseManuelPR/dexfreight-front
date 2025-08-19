<template>
  <admin-layout>
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-title-md font-semibold text-gray-900 dark:text-white">
            Gestión de Conductores
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Administra el personal de conductores
          </p>
        </div>
        <div class="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            :start-icon="RefreshIcon"
            @click="refreshDrivers"
            :disabled="loading"
          >
            Actualizar
          </Button>
        </div>
      </div>
  
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div class="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-theme-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ drivers.length }}</p>
            </div>
            <div class="bg-orange-500 p-2 rounded-lg">
              <UserGroupIcon class="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        
        <div class="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-theme-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Activos</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ activeDrivers.length }}</p>
            </div>
            <div class="bg-success-500 p-2 rounded-lg">
              <CheckIcon class="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
  
        <div class="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-theme-sm border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Disponibles</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ availableDrivers.length }}</p>
            </div>
            <div class="bg-brand-500 p-2 rounded-lg">
              <UserCircleIcon class="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
  
      <!-- Filters -->
      <div class="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-theme-sm border border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Buscar
            </label>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Nombre, email, teléfono..."
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
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="suspended">Suspendido</option>
            </select>
          </div>
        </div>
      </div>
  
      <!-- Drivers Table -->
      <div class="rounded-lg bg-white dark:bg-gray-800 shadow-theme-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            Conductores ({{ filteredDrivers.length }})
          </h3>
        </div>
  
        <div v-if="loading" class="p-6">
          <div class="animate-pulse space-y-4">
            <div v-for="i in 5" :key="i" class="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
  
        <div v-else-if="filteredDrivers.length === 0" class="p-12 text-center">
          <UserGroupIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-4 text-sm font-medium text-gray-900 dark:text-white">
            No se encontraron conductores
          </h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Intenta ajustar los filtros o agregar un nuevo conductor
          </p>
        </div>
  
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Conductor
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contacto
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Licencia
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Estado
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Fecha de Ingreso
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr 
                v-for="driver in filteredDrivers" 
                :key="driver.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <Avatar 
                      :src="driver.profileImage" 
                      :name="`${driver.firstName} ${driver.lastName}`"
                      size="md"
                      class="mr-4"
                    />
                    <div>
                      <div class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ driver.firstName }} {{ driver.lastName }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        ID: {{ driver.id }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ driver.email }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ driver.phone }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ driver.licenseNumber }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Exp: {{ formatDate(driver.licenseExpiry) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <Badge 
                    :color="getStatusColor(driver.status)"
                    variant="light"
                    size="sm"
                  >
                    {{ getStatusLabel(driver.status) }}
                  </Badge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(driver.hireDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Ver
                    </Button>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Avatar from '@/components/ui/Avatar.vue'
import { useDriversStore } from '@/store'
import RefreshIcon from '@/icons/RefreshIcon.vue'
import PlusIcon from '@/icons/PlusIcon.vue'
import UserGroupIcon from '@/icons/UserGroupIcon.vue'
import UserCircleIcon from '@/icons/UserCircleIcon.vue'
import CheckIcon from '@/icons/CheckIcon.vue'

// Store
const driversStore = useDriversStore()

// Reactive state
const searchTerm = ref('')
const statusFilter = ref('')

// Computed
const loading = computed(() => driversStore.loading)
const drivers = computed(() => driversStore.drivers)
const activeDrivers = computed(() => driversStore.activeDrivers)
const availableDrivers = computed(() => driversStore.availableDrivers)

const filteredDrivers = computed(() => {
  let filtered = drivers.value

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(d => 
      `${d.firstName} ${d.lastName}`.toLowerCase().includes(term) ||
      d.email.toLowerCase().includes(term) ||
      d.phone.includes(term) ||
      d.licenseNumber.toLowerCase().includes(term)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(d => d.status === statusFilter.value)
  }

  return filtered
})

// Methods
function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    active: 'success',
    inactive: 'light',
    suspended: 'error'
  }
  return colors[status] || 'light'
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    active: 'Activo',
    inactive: 'Inactivo',
    suspended: 'Suspendido'
  }
  return labels[status] || status
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(dateString))
}

async function refreshDrivers() {
  await driversStore.fetchDrivers()
}

// Lifecycle
onMounted(() => {
  driversStore.fetchDrivers()
})

// Export component options
defineComponent({
  components: {
    AdminLayout
  }
})
</script>
