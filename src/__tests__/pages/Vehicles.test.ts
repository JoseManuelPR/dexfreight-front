import { describe, it, expect } from 'vitest'
import type { Vehicle, TestFilterFunction, TestSortFunction, TestCalculationFunction } from '@/types/models'

// Mock data
const mockVehicles: Vehicle[] = [
  {
    id: 'V001',
    licensePlate: 'ABC123',
    model: 'Freightliner',
    brand: 'Mercedes',
    year: 2020,
    type: 'truck',
    capacity: 5000,
    fuelType: 'diesel',
    status: 'available',
    mileage: 50000,
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15',
    registrationExpiry: '2025-01-01',
    insuranceExpiry: '2024-12-31',
    gpsEnabled: true
  },
  {
    id: 'V002',
    licensePlate: 'XYZ789',
    model: 'Sprinter',
    brand: 'Mercedes',
    year: 2021,
    type: 'van',
    capacity: 2000,
    fuelType: 'diesel',
    status: 'in-use',
    mileage: 30000,
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-05-01',
    registrationExpiry: '2025-02-01',
    insuranceExpiry: '2024-11-30',
    currentDriverId: 'D001',
    gpsEnabled: true
  }
]

describe('Vehicles Logic', () => {
  it('filters vehicles by search term', () => {
    const filterBySearchTerm: TestFilterFunction<Vehicle> = (vehicles: Vehicle[], searchTerm: string) => {
      return vehicles.filter(vehicle => 
        vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    const result = filterBySearchTerm(mockVehicles, 'ABC')
    expect(result).toHaveLength(1)
    expect(result[0].licensePlate).toBe('ABC123')
  })

  it('filters vehicles by status', () => {
    const filterByStatus: TestFilterFunction<Vehicle> = (vehicles: Vehicle[], status: string) => {
      return vehicles.filter(vehicle => vehicle.status === status)
    }

    const result = filterByStatus(mockVehicles, 'available')
    expect(result).toHaveLength(1)
    expect(result[0].status).toBe('available')
  })

  it('filters vehicles by type', () => {
    const filterByType: TestFilterFunction<Vehicle> = (vehicles: Vehicle[], type: string) => {
      return vehicles.filter(vehicle => vehicle.type === type)
    }

    const result = filterByType(mockVehicles, 'truck')
    expect(result).toHaveLength(1)
    expect(result[0].type).toBe('truck')
  })

  it('calculates vehicle statistics correctly', () => {
    const calculateVehicleStats: TestCalculationFunction<Vehicle> = (vehicles: Vehicle[]) => {
      return {
        total: vehicles.length,
        available: vehicles.filter(v => v.status === 'available').length,
        inUse: vehicles.filter(v => v.status === 'in-use').length,
        maintenance: vehicles.filter(v => v.status === 'maintenance').length,
        offline: vehicles.filter(v => v.status === 'offline').length
      }
    }

    const stats = calculateVehicleStats(mockVehicles)
    expect(stats.total).toBe(2)
    expect(stats.available).toBe(1)
    expect(stats.inUse).toBe(1)
  })

  it('checks if vehicle has assigned driver', () => {
    const hasAssignedDriver = (vehicle: Vehicle): boolean => {
      return !!vehicle.currentDriverId
    }

    expect(hasAssignedDriver(mockVehicles[0])).toBe(false)
    expect(hasAssignedDriver(mockVehicles[1])).toBe(true)
  })

  it('sorts vehicles by capacity', () => {
    const sortByCapacity: TestSortFunction<Vehicle> = (vehicles: Vehicle[], ascending = false) => {
      return [...vehicles].sort((a, b) => {
        return ascending ? a.capacity - b.capacity : b.capacity - a.capacity
      })
    }

    const result = sortByCapacity(mockVehicles, false)
    expect(result[0].capacity).toBe(5000)
    expect(result[1].capacity).toBe(2000)
  })

  it('sorts vehicles by mileage', () => {
    const sortByMileage: TestSortFunction<Vehicle> = (vehicles: Vehicle[], ascending = true) => {
      return [...vehicles].sort((a, b) => {
        return ascending ? a.mileage - b.mileage : b.mileage - a.mileage
      })
    }

    const result = sortByMileage(mockVehicles, true)
    expect(result[0].mileage).toBe(30000)
    expect(result[1].mileage).toBe(50000)
  })

  it('applies multiple filters correctly', () => {
    const applyFilters = (vehicles: Vehicle[], searchTerm: string, status: string, type: string) => {
      return vehicles.filter(vehicle => {
        const matchesSearch = !searchTerm || 
          vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
        
        const matchesStatus = !status || vehicle.status === status
        const matchesType = !type || vehicle.type === type
        
        return matchesSearch && matchesStatus && matchesType
      })
    }

    const result = applyFilters(mockVehicles, 'ABC', 'available', 'truck')
    expect(result).toHaveLength(1)
    expect(result[0].licensePlate).toBe('ABC123')
  })

  it('returns correct status colors', () => {
    const getStatusColor = (status: string): string => {
      const colors: Record<string, string> = {
        available: 'success',
        'in-use': 'primary',
        maintenance: 'warning',
        offline: 'error'
      }
      return colors[status] || 'light'
    }

    expect(getStatusColor('available')).toBe('success')
    expect(getStatusColor('in-use')).toBe('primary')
    expect(getStatusColor('maintenance')).toBe('warning')
    expect(getStatusColor('offline')).toBe('error')
  })

  it('returns correct type labels', () => {
    const getTypeLabel = (type: string): string => {
      const labels: Record<string, string> = {
        truck: 'Camión',
        van: 'Camioneta',
        trailer: 'Tráiler',
        pickup: 'Pickup'
      }
      return labels[type] || type
    }

    expect(getTypeLabel('truck')).toBe('Camión')
    expect(getTypeLabel('van')).toBe('Camioneta')
    expect(getTypeLabel('trailer')).toBe('Tráiler')
    expect(getTypeLabel('pickup')).toBe('Pickup')
  })
})
