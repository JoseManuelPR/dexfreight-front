import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Shipment,
  Vehicle,
  Driver,
  DashboardStats,
  FilterOptions
} from '@/types/models'
import { api, handleApiError } from '@/services/api'

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

    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()

      return dateB - dateA
    })

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

  const cancelledShipments = computed(() =>
    shipments.value.filter(s => s.status === 'cancelled')
  )

  const delayedShipments = computed(() =>
    shipments.value.filter(s => s.status === 'delayed')
  )

  // Actions
  async function fetchShipments() {
    loading.value = true
    error.value = null

    try {
      const response = await api.getShipments()

      shipments.value = response.data
    } catch (err) {
      error.value = handleApiError(err)
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
      error.value = handleApiError(err)
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
      error.value = handleApiError(err)
      console.error('Error updating shipment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteShipment(id: string) {
    loading.value = true
    error.value = null

    try {
      await api.deleteShipment(id)
      const index = shipments.value.findIndex(s => s.id === id)

      if (index !== -1) {
        shipments.value.splice(index, 1)
      }

      return true
    } catch (err) {
      error.value = handleApiError(err)
      console.error('Error deleting shipment:', err)
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
    cancelledShipments,
    delayedShipments,
    // Actions
    fetchShipments,
    createShipment,
    updateShipment,
    deleteShipment,
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

  const vehiclesInUse = computed(() =>
    vehicles.value.filter(v => v.status === 'in-use')
  )

  const vehiclesInMaintenance = computed(() =>
    vehicles.value.filter(v => v.status === 'maintenance')
  )

  const vehiclesOffline = computed(() =>
    vehicles.value.filter(v => v.status === 'offline')
  )

  // Legacy computed for backward compatibility
  const vehiclesInTransit = computed(() => vehiclesInUse.value)

  async function fetchVehicles() {
    loading.value = true
    error.value = null

    try {
      const response = await api.getVehicles()

      vehicles.value = response.data
    } catch (err) {
      error.value = handleApiError(err)
      console.error('Error fetching vehicles:', err)
    } finally {
      loading.value = false
    }
  }

  async function createVehicle(vehicleData: Omit<Vehicle, 'id'>) {
    loading.value = true
    error.value = null

    try {
      const response = await api.createVehicle(vehicleData)

      vehicles.value.push(response.data)

      return response.data
    } catch (err) {
      error.value = handleApiError(err)
      console.error('Error creating vehicle:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateVehicle(id: string, data: Partial<Vehicle>) {
    loading.value = true
    error.value = null

    try {
      const response = await api.updateVehicle(id, data)
      const index = vehicles.value.findIndex(v => v.id === id)

      if (index !== -1) {
        vehicles.value[index] = response.data
      }

      return response.data
    } catch (err) {
      error.value = handleApiError(err)
      console.error('Error updating vehicle:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteVehicle(id: string) {
    loading.value = true
    error.value = null

    try {
      await api.deleteVehicle(id)
      const index = vehicles.value.findIndex(v => v.id === id)

      if (index !== -1) {
        vehicles.value.splice(index, 1)
      }

      return true
    } catch (err) {
      error.value = handleApiError(err)
      console.error('Error deleting vehicle:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    vehicles,
    loading,
    error,
    availableVehicles,
    vehiclesInUse,
    vehiclesInMaintenance,
    vehiclesOffline,
    vehiclesInTransit, // Legacy - alias for vehiclesInUse
    fetchVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle
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

  const driversOnDelivery = computed(() =>
    drivers.value.filter(d => d.status === 'on-delivery')
  )

  const driversOffDuty = computed(() =>
    drivers.value.filter(d => d.status === 'off-duty')
  )

  const driversSuspended = computed(() =>
    drivers.value.filter(d => d.status === 'suspended')
  )

  async function fetchDrivers() {
    loading.value = true
    error.value = null

    try {
      const response = await api.getDrivers()

      drivers.value = response.data
    } catch (err) {
      error.value = handleApiError(err)
      console.error('Error fetching drivers:', err)
    } finally {
      loading.value = false
    }
  }

  async function createDriver(driverData: Omit<Driver, 'id'>) {
    loading.value = true
    error.value = null

    try {
      const response = await api.createDriver(driverData)

      drivers.value.push(response.data)

      return response.data
    } catch (err) {
      error.value = handleApiError(err)
      console.error('Error creating driver:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateDriver(id: string, data: Partial<Driver>) {
    loading.value = true
    error.value = null

    try {
      const response = await api.updateDriver(id, data)
      const index = drivers.value.findIndex(d => d.id === id)

      if (index !== -1) {
        drivers.value[index] = response.data
      }

      return response.data
    } catch (err) {
      error.value = handleApiError(err)
      console.error('Error updating driver:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteDriver(id: string) {
    loading.value = true
    error.value = null

    try {
      await api.deleteDriver(id)
      const index = drivers.value.findIndex(d => d.id === id)

      if (index !== -1) {
        drivers.value.splice(index, 1)
      }

      return true
    } catch (err) {
      error.value = handleApiError(err)
      console.error('Error deleting driver:', err)
      throw err
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
    driversOnDelivery,
    driversOffDuty,
    driversSuspended,
    fetchDrivers,
    createDriver,
    updateDriver,
    deleteDriver
  }
})

// Store for dashboard
export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref<DashboardStats | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchDashboardStats() {
    if (!stats.value) {
      loading.value = true
    }
    error.value = null

    try {
      const response = await api.getDashboardStats()

      stats.value = response.data
    } catch (err) {
      error.value = handleApiError(err)
      console.error('Error fetching dashboard stats:', err)
    } finally {
      loading.value = false
    }
  }

  function getComputedStats() {
    const shipmentsStore = useShipmentsStore()
    const vehiclesStore = useVehiclesStore()
    const driversStore = useDriversStore()

    return {
      totalShipments: shipmentsStore.shipments.length,
      activeShipments: shipmentsStore.activeShipments.length,
      deliveredShipments: shipmentsStore.deliveredShipments.length,
      pendingShipments: shipmentsStore.pendingShipments.length,
      cancelledShipments: shipmentsStore.cancelledShipments.length,
      delayedShipments: shipmentsStore.delayedShipments.length,
      totalRevenue: shipmentsStore.shipments.reduce((total, s) => total + s.value, 0),
      activeVehicles: vehiclesStore.availableVehicles.length + vehiclesStore.vehiclesInUse.length,
      availableDrivers: driversStore.availableDrivers.length,
      availableVehicles: vehiclesStore.availableVehicles.length,
      vehiclesInUse: vehiclesStore.vehiclesInUse.length,
      maintenanceVehicles: vehiclesStore.vehiclesInMaintenance.length,
      vehiclesOffline: vehiclesStore.vehiclesOffline.length,
      driversOnDelivery: driversStore.driversOnDelivery.length,
      driversOffDuty: driversStore.driversOffDuty.length,
      driversSuspended: driversStore.driversSuspended.length
    }
  }

  return {
    stats,
    loading,
    error,
    getComputedStats,
    fetchDashboardStats
  }
})
