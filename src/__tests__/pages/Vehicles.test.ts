import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

describe('Vehicles Page Logic', () => {
  const mockVehicles = [
    {
      id: 'VH001',
      licensePlate: 'APV-123',
      brand: 'Mercedes-Benz',
      model: 'Actros',
      year: 2022,
      type: 'truck',
      capacity: 5000,
      mileage: 45000,
      fuelType: 'diesel',
      status: 'available',
      currentDriverId: null
    },
    {
      id: 'VH002',
      licensePlate: 'BCW-456',
      brand: 'Mercedes-Benz',
      model: 'Sprinter',
      year: 2021,
      type: 'van',
      capacity: 2500,
      mileage: 32000,
      fuelType: 'diesel',
      status: 'in-use',
      currentDriverId: 'DR001'
    },
    {
      id: 'VH003',
      licensePlate: 'CDX-789',
      brand: 'Volvo',
      model: 'FH16',
      year: 2020,
      type: 'truck',
      capacity: 8000,
      mileage: 87000,
      fuelType: 'diesel',
      status: 'maintenance',
      currentDriverId: null
    }
  ]

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should filter vehicles by search term correctly', () => {
    const filterBySearchTerm = (vehicles: any[], searchTerm: string) => {
      if (!searchTerm) return vehicles
      
      const term = searchTerm.toLowerCase()
      return vehicles.filter(v => 
        v.licensePlate.toLowerCase().includes(term) ||
        v.model.toLowerCase().includes(term) ||
        v.brand.toLowerCase().includes(term)
      )
    }

    let filtered = filterBySearchTerm(mockVehicles, 'APV-123')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].licensePlate).toBe('APV-123')

    filtered = filterBySearchTerm(mockVehicles, 'Mercedes')
    expect(filtered).toHaveLength(2)

    filtered = filterBySearchTerm(mockVehicles, 'Actros')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].model).toBe('Actros')

    filtered = filterBySearchTerm(mockVehicles, 'Volvo')
    expect(filtered).toHaveLength(1)

    filtered = filterBySearchTerm(mockVehicles, '')
    expect(filtered).toHaveLength(3)
  })

  it('should filter vehicles by status correctly', () => {
    const filterByStatus = (vehicles: any[], status: string) => {
      if (!status) return vehicles
      return vehicles.filter(v => v.status === status)
    }

    let filtered = filterByStatus(mockVehicles, 'available')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].status).toBe('available')

    filtered = filterByStatus(mockVehicles, 'in-use')
    expect(filtered).toHaveLength(1)

    filtered = filterByStatus(mockVehicles, 'maintenance')
    expect(filtered).toHaveLength(1)

    filtered = filterByStatus(mockVehicles, 'offline')
    expect(filtered).toHaveLength(0)

    filtered = filterByStatus(mockVehicles, '')
    expect(filtered).toHaveLength(3)
  })

  it('should filter vehicles by type correctly', () => {
    const filterByType = (vehicles: any[], type: string) => {
      if (!type) return vehicles
      return vehicles.filter(v => v.type === type)
    }

    let filtered = filterByType(mockVehicles, 'truck')
    expect(filtered).toHaveLength(2)
    expect(filtered.every(v => v.type === 'truck')).toBe(true)

    filtered = filterByType(mockVehicles, 'van')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].type).toBe('van')

    filtered = filterByType(mockVehicles, 'trailer')
    expect(filtered).toHaveLength(0)

    filtered = filterByType(mockVehicles, '')
    expect(filtered).toHaveLength(3)
  })

  it('should return correct status colors', () => {
    const getStatusColor = (status: string) => {
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
    expect(getStatusColor('unknown')).toBe('light')
  })

  it('should return correct status labels in Spanish', () => {
    const getStatusLabel = (status: string) => {
      const labels: Record<string, string> = {
        available: 'Disponible',
        'in-use': 'En Uso',
        maintenance: 'Mantenimiento',
        offline: 'Fuera de Línea'
      }
      return labels[status] || status
    }

    expect(getStatusLabel('available')).toBe('Disponible')
    expect(getStatusLabel('in-use')).toBe('En Uso')
    expect(getStatusLabel('maintenance')).toBe('Mantenimiento')
    expect(getStatusLabel('offline')).toBe('Fuera de Línea')
  })

  it('should return correct type labels in Spanish', () => {
    const getTypeLabel = (type: string) => {
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

  it('should return correct fuel type labels in Spanish', () => {
    const getFuelTypeLabel = (fuelType: string) => {
      const labels: Record<string, string> = {
        diesel: 'Diésel',
        gasoline: 'Gasolina',
        electric: 'Eléctrico',
        hybrid: 'Híbrido'
      }
      return labels[fuelType] || fuelType
    }

    expect(getFuelTypeLabel('diesel')).toBe('Diésel')
    expect(getFuelTypeLabel('gasoline')).toBe('Gasolina')
    expect(getFuelTypeLabel('electric')).toBe('Eléctrico')
    expect(getFuelTypeLabel('hybrid')).toBe('Híbrido')
  })

  it('should calculate vehicle statistics correctly', () => {
    const calculateVehicleStats = (vehicles: any[]) => {
      return {
        total: vehicles.length,
        available: vehicles.filter(v => v.status === 'available').length,
        inUse: vehicles.filter(v => v.status === 'in-use').length,
        maintenance: vehicles.filter(v => v.status === 'maintenance').length,
        offline: vehicles.filter(v => v.status === 'offline').length
      }
    }

    const stats = calculateVehicleStats(mockVehicles)
    expect(stats.total).toBe(3)
    expect(stats.available).toBe(1)
    expect(stats.inUse).toBe(1)
    expect(stats.maintenance).toBe(1)
    expect(stats.offline).toBe(0)
  })

  it('should format numbers correctly', () => {
    const formatNumber = (value: number) => {
      return value.toLocaleString()
    }

    expect(formatNumber(5000)).toBe('5,000')
    expect(formatNumber(45000)).toBe('45,000')
    expect(formatNumber(1234567)).toBe('1,234,567')
  })

  it('should check if vehicle has assigned driver', () => {
    const hasAssignedDriver = (vehicle: any) => {
      return !!vehicle.currentDriverId
    }

    expect(hasAssignedDriver(mockVehicles[0])).toBe(false) // APV-123
    expect(hasAssignedDriver(mockVehicles[1])).toBe(true)  // BCW-456
    expect(hasAssignedDriver(mockVehicles[2])).toBe(false) // CDX-789
  })

  it('should sort vehicles by capacity correctly', () => {
    const sortByCapacity = (vehicles: any[], ascending = false) => {
      return [...vehicles].sort((a, b) => 
        ascending ? a.capacity - b.capacity : b.capacity - a.capacity
      )
    }

    const sortedDesc = sortByCapacity(mockVehicles, false)
    expect(sortedDesc[0].capacity).toBe(8000) // Volvo FH16
    expect(sortedDesc[1].capacity).toBe(5000) // Mercedes Actros
    expect(sortedDesc[2].capacity).toBe(2500) // Mercedes Sprinter

    const sortedAsc = sortByCapacity(mockVehicles, true)
    expect(sortedAsc[0].capacity).toBe(2500)
    expect(sortedAsc[2].capacity).toBe(8000)
  })

  it('should sort vehicles by mileage correctly', () => {
    const sortByMileage = (vehicles: any[], ascending = true) => {
      return [...vehicles].sort((a, b) => 
        ascending ? a.mileage - b.mileage : b.mileage - a.mileage
      )
    }

    const sortedAsc = sortByMileage(mockVehicles, true)
    expect(sortedAsc[0].mileage).toBe(32000) // BCW-456
    expect(sortedAsc[1].mileage).toBe(45000) // APV-123
    expect(sortedAsc[2].mileage).toBe(87000) // CDX-789
  })

  it('should combine multiple filters correctly', () => {
    const applyFilters = (vehicles: any[], searchTerm: string, status: string, type: string) => {
      let filtered = vehicles

      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filtered = filtered.filter(v => 
          v.licensePlate.toLowerCase().includes(term) ||
          v.model.toLowerCase().includes(term) ||
          v.brand.toLowerCase().includes(term)
        )
      }

      if (status) {
        filtered = filtered.filter(v => v.status === status)
      }

      if (type) {
        filtered = filtered.filter(v => v.type === type)
      }

      return filtered
    }

    let filtered = applyFilters(mockVehicles, 'Mercedes', '', 'truck')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].model).toBe('Actros')

    filtered = applyFilters(mockVehicles, '', 'available', 'truck')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].licensePlate).toBe('APV-123')

    filtered = applyFilters(mockVehicles, 'NonExistent', '', '')
    expect(filtered).toHaveLength(0)
  })
})
