import shipmentsData from '@/mock/shipments.json'
import vehiclesData from '@/mock/vehicles.json'
import driversData from '@/mock/drivers.json'
import type {
  Shipment,
  Vehicle,
  Driver,
  DashboardStats,
  ApiResponse,
  ShipmentFilters
} from '@/types/models'
import { apiCache, CacheService } from './cache'

// Network delay simulation
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Helper function to simulate API responses
function createApiResponse<T>(data: T, success = true, message = 'Success'): ApiResponse<T> {
  return {
    data,
    success,
    message
  }
}

// Mock data
let mockShipments: Shipment[] = []
let mockVehicles: Vehicle[] = []
let mockDrivers: Driver[] = []

// Load mock data on initialization
function loadMockData() {
  try {
    // Try to load from localStorage first
    const storedShipments = localStorage.getItem('dexfreight-mock-shipments')
    const storedVehicles = localStorage.getItem('dexfreight-mock-vehicles')
    const storedDrivers = localStorage.getItem('dexfreight-mock-drivers')

    if (storedShipments && storedVehicles && storedDrivers) {
      mockShipments = JSON.parse(storedShipments)
      mockVehicles = JSON.parse(storedVehicles)
      mockDrivers = JSON.parse(storedDrivers)
      console.log('Mock data loaded from localStorage:', {
        shipments: mockShipments.length,
        vehicles: mockVehicles.length,
        drivers: mockDrivers.length
      })
    } else {
      // Load from JSON files if no persistent data
      mockShipments = shipmentsData as Shipment[] || []
      mockVehicles = vehiclesData as Vehicle[] || []
      mockDrivers = driversData as Driver[] || []

      // Save to localStorage for future use
      saveMockDataToStorage()

      console.log('Mock data loaded from JSON files:', {
        shipments: mockShipments.length,
        vehicles: mockVehicles.length,
        drivers: mockDrivers.length
      })
    }
  } catch (error) {
    console.warn('No se pudieron cargar los datos mock:', error)
    // Use default data if JSON files cannot be loaded
    initializeDefaultData()
    saveMockDataToStorage()
  }
}

/**
 * Save mock data to localStorage
 */
function saveMockDataToStorage(): void {
  try {
    localStorage.setItem('dexfreight-mock-shipments', JSON.stringify(mockShipments))
    localStorage.setItem('dexfreight-mock-vehicles', JSON.stringify(mockVehicles))
    localStorage.setItem('dexfreight-mock-drivers', JSON.stringify(mockDrivers))
  } catch (error) {
    console.warn('Error saving mock data to localStorage:', error)
  }
}

/**
 * Invalidate cache for shipments changes
 */
function invalidateShipmentsCache(): void {
  apiCache.invalidatePattern('shipments')
  apiCache.invalidatePattern('dashboard-stats')
}

/**
 * Invalidate cache for vehicles changes
 */
function invalidateVehiclesCache(): void {
  apiCache.invalidatePattern('vehicles')
  apiCache.invalidatePattern('dashboard-stats')
}

/**
 * Invalidate cache for drivers changes
 */
function invalidateDriversCache(): void {
  apiCache.invalidatePattern('drivers')
  apiCache.invalidatePattern('dashboard-stats')
}

// Default data if JSON files cannot be loaded
function initializeDefaultData() {
  mockShipments = [
    {
      id: 'SH001',
      trackingNumber: 'TN202501001',
      origin: {
        street: 'Av. Insurgentes 123',
        city: 'Lima',
        state: 'Lima',
        zipCode: '01000',
        country: 'Perú'
      },
      destination: {
        street: 'Av. Tacna 258',
        city: 'Tacna',
        state: 'Tacna',
        zipCode: '23001',
        country: 'Perú'
      },
      status: 'in_transit',
      priority: 'high',
      createdAt: '2025-01-18T10:00:00.000Z',
      scheduledPickup: '2025-01-18T14:00:00.000Z',
      actualPickup: '2025-01-18T14:15:00.000Z',
      estimatedDelivery: '2025-01-20T16:00:00.000Z',
      weight: 150.5,
      volume: 2.3,
      value: 15000,
      currency: 'PEN',
      goods: [
        {
          id: 'ITEM001',
          description: 'Equipos electrónicos',
          quantity: 5,
          unit: 'pcs',
          weight: 150.5,
          value: 15000,
          category: 'Electronics',
          fragile: true,
          hazardous: false
        }
      ],
      driverId: 'DR001',
      vehicleId: 'VH001',
      customer: {
        id: 'CU001',
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        phone: '+51 555 123 4567',
        company: 'Tech Solutions SA',
        address: {
          street: 'Av. Insurgentes 123',
          city: 'Lima',
          state: 'Lima',
          zipCode: '01000',
          country: 'Perú'
        },
        accountType: 'business'
      },
      route: {
        distance: 1650,
        estimatedTime: 1200
      },
      notes: [
        'Entrega en horario de oficina únicamente'
      ]
    }
  ]
  mockVehicles = [
    {
      id: 'VH001',
      licensePlate: 'ABC-123',
      model: 'Actros',
      brand: 'Mercedes-Benz',
      year: 2022,
      type: 'truck',
      capacity: 5000,
      fuelType: 'diesel',
      status: 'in-use',
      mileage: 45000,
      lastMaintenance: '2024-12-15T00:00:00.000Z',
      nextMaintenance: '2025-03-15T00:00:00.000Z',
      registrationExpiry: '2025-12-31T00:00:00.000Z',
      insuranceExpiry: '2025-06-30T00:00:00.000Z',
      currentDriverId: 'DR001',
      gpsEnabled: true
    }
  ]
  mockDrivers = [
    {
      id: 'DR001',
      name: 'Carlos González',
      license: 'LIC123456789',
      phone: '+51 555 987 6543',
      email: 'carlos.gonzalez@transport.com',
      status: 'on-delivery',
      currentVehicle: 'VH001',
      rating: 4.8,
      totalDeliveries: 145,
      onTimeDeliveries: 138
    }
  ]
}

// Initialize data when loading the module
loadMockData()

// API Service
export const api = {
  // Shipments
  async getShipments(filters?: ShipmentFilters): Promise<ApiResponse<Shipment[]>> {
    const cacheKey = CacheService.createKey('shipments', filters)

    const cached = apiCache.get<Shipment[]>(cacheKey)

    if (cached) {
      return createApiResponse(cached)
    }

    await delay(200)

    let filtered = [...mockShipments]

    if (filters?.status) {
      filtered = filtered.filter(s => filters.status?.includes(s.status))
    }

    if (filters?.priority) {
      filtered = filtered.filter(s => filters.priority?.includes(s.priority))
    }

    apiCache.set(cacheKey, filtered)

    return createApiResponse(filtered)
  },

  async getShipment(id: string): Promise<ApiResponse<Shipment | null>> {
    await delay(200)

    const shipment = mockShipments.find(s => s.id === id)

    return createApiResponse(shipment || null)
  },

  async createShipment(shipmentData: Omit<Shipment, 'id' | 'createdAt'>): Promise<ApiResponse<Shipment>> {
    await delay(700)

    const newShipment: Shipment = {
      ...shipmentData,
      id: `SH${String(mockShipments.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString()
    }

    mockShipments.push(newShipment)
    saveMockDataToStorage()
    invalidateShipmentsCache()

    return createApiResponse(newShipment, true, 'Envío creado exitosamente')
  },

  async updateShipment(id: string, data: Partial<Shipment>): Promise<ApiResponse<Shipment>> {
    await delay(500)

    const index = mockShipments.findIndex(s => s.id === id)

    if (index === -1) {
      throw new Error('Envío no encontrado')
    }

    mockShipments[index] = { ...mockShipments[index], ...data }
    saveMockDataToStorage()
    invalidateShipmentsCache()

    return createApiResponse(mockShipments[index], true, 'Envío actualizado exitosamente')
  },

  async deleteShipment(id: string): Promise<ApiResponse<boolean>> {
    await delay(400)

    const index = mockShipments.findIndex(s => s.id === id)

    if (index === -1) {
      throw new Error('Envío no encontrado')
    }

    mockShipments.splice(index, 1)
    saveMockDataToStorage()
    invalidateShipmentsCache()

    return createApiResponse(true, true, 'Envío eliminado exitosamente')
  },

  // Vehicles
  async getVehicles(): Promise<ApiResponse<Vehicle[]>> {
    const cacheKey = 'vehicles'

    const cached = apiCache.get<Vehicle[]>(cacheKey)

    if (cached) {
      return createApiResponse(cached)
    }

    await delay(200)

    const vehicles = [...mockVehicles]

    apiCache.set(cacheKey, vehicles)

    return createApiResponse(vehicles)
  },

  async getVehicle(id: string): Promise<ApiResponse<Vehicle | null>> {
    await delay(200)

    const vehicle = mockVehicles.find(v => v.id === id)

    return createApiResponse(vehicle || null)
  },

  async createVehicle(data: Omit<Vehicle, 'id'>): Promise<ApiResponse<Vehicle>> {
    await delay(500)

    const newId = `VH${String(mockVehicles.length + 1).padStart(3, '0')}`

    const newVehicle: Vehicle = {
      id: newId,
      ...data
    }

    mockVehicles.push(newVehicle)
    saveMockDataToStorage()
    invalidateVehiclesCache()

    return createApiResponse(newVehicle, true, 'Vehículo creado exitosamente')
  },

  async updateVehicle(id: string, data: Partial<Vehicle>): Promise<ApiResponse<Vehicle>> {
    await delay(500)

    const index = mockVehicles.findIndex(v => v.id === id)

    if (index === -1) {
      throw new Error('Vehículo no encontrado')
    }

    mockVehicles[index] = { ...mockVehicles[index], ...data }
    saveMockDataToStorage()
    invalidateVehiclesCache()

    return createApiResponse(mockVehicles[index], true, 'Vehículo actualizado exitosamente')
  },

  async deleteVehicle(id: string): Promise<ApiResponse<boolean>> {
    await delay(400)

    const index = mockVehicles.findIndex(v => v.id === id)

    if (index === -1) {
      throw new Error('Vehículo no encontrado')
    }

    mockVehicles.splice(index, 1)
    saveMockDataToStorage()
    invalidateVehiclesCache()

    return createApiResponse(true, true, 'Vehículo eliminado exitosamente')
  },

  // Drivers
  async getDrivers(): Promise<ApiResponse<Driver[]>> {
    const cacheKey = 'drivers'

    const cached = apiCache.get<Driver[]>(cacheKey)

    if (cached) {
      return createApiResponse(cached)
    }

    await delay(200)

    const drivers = [...mockDrivers]

    apiCache.set(cacheKey, drivers)

    return createApiResponse(drivers)
  },

  async getDriver(id: string): Promise<ApiResponse<Driver | null>> {
    await delay(200)

    const driver = mockDrivers.find(d => d.id === id)

    return createApiResponse(driver || null)
  },

  async createDriver(data: Omit<Driver, 'id'>): Promise<ApiResponse<Driver>> {
    await delay(500)

    const newId = `DR${String(mockDrivers.length + 1).padStart(3, '0')}`

    const newDriver: Driver = {
      id: newId,
      ...data
    }

    mockDrivers.push(newDriver)
    saveMockDataToStorage()
    invalidateDriversCache()

    return createApiResponse(newDriver, true, 'Conductor creado exitosamente')
  },

  async updateDriver(id: string, data: Partial<Driver>): Promise<ApiResponse<Driver>> {
    await delay(500)

    const index = mockDrivers.findIndex(d => d.id === id)

    if (index === -1) {
      throw new Error('Conductor no encontrado')
    }

    mockDrivers[index] = { ...mockDrivers[index], ...data }
    saveMockDataToStorage()
    invalidateDriversCache()

    return createApiResponse(mockDrivers[index], true, 'Conductor actualizado exitosamente')
  },

  async deleteDriver(id: string): Promise<ApiResponse<boolean>> {
    await delay(400)

    const index = mockDrivers.findIndex(d => d.id === id)

    if (index === -1) {
      throw new Error('Conductor no encontrado')
    }

    mockDrivers.splice(index, 1)
    saveMockDataToStorage()
    invalidateDriversCache()

    return createApiResponse(true, true, 'Conductor eliminado exitosamente')
  },

  // Dashboard
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    const cacheKey = 'dashboard-stats'

    const cached = apiCache.get<DashboardStats>(cacheKey)

    if (cached) {
      return createApiResponse(cached)
    }

    await delay(200)

    const stats: DashboardStats = {
      totalShipments: mockShipments.length,
      activeShipments: mockShipments.filter(s => s.status === 'in_transit').length,
      deliveredShipments: mockShipments.filter(s => s.status === 'delivered').length,
      pendingShipments: mockShipments.filter(s => s.status === 'pending').length,
      totalRevenue: mockShipments.reduce((total, s) => total + s.value, 0),
      activeVehicles: mockVehicles.filter(v => ['available', 'in-use'].includes(v.status)).length,
      availableDrivers: mockDrivers.filter(d => ['available', 'on-delivery'].includes(d.status)).length,
      maintenanceVehicles: mockVehicles.filter(v => v.status === 'maintenance').length
    }

    apiCache.set(cacheKey, stats)

    return createApiResponse(stats)
  }
}

// Helper to handle API errors
export function handleApiError(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    const errorObj = error as Record<string, unknown>

    if (errorObj.response && typeof errorObj.response === 'object') {
      const response = errorObj.response as Record<string, unknown>

      if (response.data && typeof response.data === 'object') {
        const data = response.data as Record<string, unknown>

        if (typeof data.message === 'string') {
          return data.message
        }
      }
    }

    if (typeof errorObj.message === 'string') {
      return errorObj.message
    }
  }

  return 'Ha ocurrido un error inesperado'
}

// Export cache utilities for manual cache management
export const cacheUtils = {
  clear: () => apiCache.clear(),
  clearPattern: (pattern: string) => apiCache.invalidatePattern(pattern),
  size: () => apiCache.getStats().size,
  keys: () => apiCache.getStats().keys,
  stats: () => apiCache.getStats(),
  resetMockData: () => {
    mockShipments = shipmentsData as Shipment[] || []
    mockVehicles = vehiclesData as Vehicle[] || []
    mockDrivers = driversData as Driver[] || []

    // Save reset data to localStorage
    saveMockDataToStorage()

    apiCache.invalidatePattern('shipments')
    apiCache.invalidatePattern('vehicles')
    apiCache.invalidatePattern('drivers')
    apiCache.invalidatePattern('dashboard-stats')
  }
}
