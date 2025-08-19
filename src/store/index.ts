import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Shipment,
  Vehicle,
  Driver,
  DashboardStats,
  FilterOptions
} from '@/types/models'
import { api } from '@/services/api'

// Main store for shipments
export const useShipmentsStore = defineStore('shipments', () => {
  const shipments = ref<Shipment[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<FilterOptions>({})

  // Computed
  const filteredShipments = computed(() => {
    let filtered = shipments.value

    if (filters.value.status?.length) {
      filtered = filtered.filter(s => filters.value.status!.includes(s.status))
    }

    if (filters.value.priority?.length) {
      filtered = filtered.filter(s => filters.value.priority!.includes(s.priority))
    }

    if (filters.value.searchTerm) {
      const term = filters.value.searchTerm.toLowerCase()
      filtered = filtered.filter(s => 
        s.trackingNumber.toLowerCase().includes(term) ||
        s.customer.name.toLowerCase().includes(term) ||
        s.origin.city.toLowerCase().includes(term) ||
        s.destination.city.toLowerCase().includes(term)
      )
    }

    return filtered
  })

  const activeShipments = computed(() => 
    shipments.value.filter(s => s.status === 'in_transit')
  )

  const pendingShipments = computed(() => 
    shipments.value.filter(s => s.status === 'pending')
  )

  const deliveredShipments = computed(() => 
    shipments.value.filter(s => s.status === 'delivered')
  )

  // Actions
  async function fetchShipments() {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.getShipments()
      shipments.value = response.data
    } catch (err) {
      error.value = 'Error al cargar envíos'
      console.error('Error fetching shipments:', err)
    } finally {
      loading.value = false
    }
  }

  async function createShipment(shipmentData: Omit<Shipment, 'id' | 'createdAt'>) {
    loading.value = true
    error.value = null

    try {
      const response = await api.createShipment(shipmentData)
      shipments.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = 'Error al crear envío'
      console.error('Error creating shipment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateShipment(id: string, data: Partial<Shipment>) {
    loading.value = true
    error.value = null

    try {
      const response = await api.updateShipment(id, data)
      const index = shipments.value.findIndex(s => s.id === id)
      if (index !== -1) {
        shipments.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = 'Error al actualizar envío'
      console.error('Error updating shipment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  function updateFilters(newFilters: FilterOptions) {
    filters.value = { ...filters.value, ...newFilters }
  }

  function clearFilters() {
    filters.value = {}
  }

  return {
    // State
    shipments,
    loading,
    error,
    filters,
    // Getters
    filteredShipments,
    activeShipments,
    pendingShipments,
    deliveredShipments,
    // Actions
    fetchShipments,
    createShipment,
    updateShipment,
    updateFilters,
    clearFilters
  }
})

// Store for vehicles
export const useVehiclesStore = defineStore('vehicles', () => {
  const vehicles = ref<Vehicle[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const availableVehicles = computed(() => 
    vehicles.value.filter(v => v.status === 'available')
  )

  const vehiclesInTransit = computed(() => 
    vehicles.value.filter(v => v.status === 'in-use')
  )

  const vehiclesInMaintenance = computed(() => 
    vehicles.value.filter(v => v.status === 'maintenance')
  )

  async function fetchVehicles() {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.getVehicles()
      vehicles.value = response.data
    } catch (err) {
      error.value = 'Error al cargar vehículos'
      console.error('Error fetching vehicles:', err)
    } finally {
      loading.value = false
    }
  }

  async function updateVehicleStatus(id: string, status: Vehicle['status']) {
    try {
      const response = await api.updateVehicle(id, { status })
      const index = vehicles.value.findIndex(v => v.id === id)
      if (index !== -1) {
        vehicles.value[index] = response.data
      }
    } catch (err) {
      error.value = 'Error al actualizar estado del vehículo'
      console.error('Error updating vehicle status:', err)
      throw err
    }
  }

  return {
    vehicles,
    loading,
    error,
    availableVehicles,
    vehiclesInTransit,
    vehiclesInMaintenance,
    fetchVehicles,
    updateVehicleStatus
  }
})

// Store for drivers
export const useDriversStore = defineStore('drivers', () => {
  const drivers = ref<Driver[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const activeDrivers = computed(() => 
    drivers.value.filter(d => ['available', 'on-delivery'].includes(d.status))
  )

  const availableDrivers = computed(() => {
    return drivers.value.filter(d => d.status === 'available')
  })

  async function fetchDrivers() {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.getDrivers()
      drivers.value = response.data
    } catch (err) {
      error.value = 'Error al cargar conductores'
      console.error('Error fetching drivers:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    drivers,
    loading,
    error,
    activeDrivers,
    availableDrivers,
    fetchDrivers
  }
})

// Store for dashboard
export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref<DashboardStats | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchDashboardStats() {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.getDashboardStats()
      stats.value = response.data
    } catch (err) {
      error.value = 'Error al cargar estadísticas'
      console.error('Error fetching dashboard stats:', err)
    } finally {
      loading.value = false
    }
  }

  // Computed stats based on other stores when no API is available
  const computedStats = computed(() => {
    const shipmentsStore = useShipmentsStore()
    const vehiclesStore = useVehiclesStore()
    const driversStore = useDriversStore()

    return {
      totalShipments: shipmentsStore.shipments.length,
      activeShipments: shipmentsStore.activeShipments.length,
      deliveredShipments: shipmentsStore.deliveredShipments.length,
      pendingShipments: shipmentsStore.pendingShipments.length,
      totalRevenue: shipmentsStore.shipments.reduce((total, s) => total + s.value, 0),
      activeVehicles: vehiclesStore.availableVehicles.length + vehiclesStore.vehiclesInTransit.length,
      availableDrivers: driversStore.availableDrivers.length,
      maintenanceVehicles: vehiclesStore.vehiclesInMaintenance.length
    }
  })

  return {
    stats,
    loading,
    error,
    computedStats,
    fetchDashboardStats
  }
})
