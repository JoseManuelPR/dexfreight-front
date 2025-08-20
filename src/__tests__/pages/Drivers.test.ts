import { describe, it, expect } from 'vitest'
import type { Driver, TestFilterFunction, TestSortFunction, TestCalculationFunction } from '@/types/models'

// Mock data
const mockDrivers: Driver[] = [
  {
    id: 'D001',
    name: 'John Smith',
    license: 'DL123456',
    phone: '+34 123 456 789',
    email: 'john@example.com',
    status: 'available',
    rating: 4.5,
    totalDeliveries: 150,
    onTimeDeliveries: 142
  },
  {
    id: 'D002',
    name: 'Maria Garcia',
    license: 'DL789012',
    phone: '+34 987 654 321',
    email: 'maria@example.com',
    status: 'on-delivery',
    currentVehicle: 'V001',
    rating: 4.8,
    totalDeliveries: 200,
    onTimeDeliveries: 195
  }
]

describe('Drivers Logic', () => {
  it('filters drivers by search term', () => {
    const filterBySearchTerm: TestFilterFunction<Driver> = (drivers: Driver[], searchTerm: string) => {
      return drivers.filter(driver =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    const result = filterBySearchTerm(mockDrivers, 'John')

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('John Smith')
  })

  it('filters drivers by status', () => {
    const filterByStatus: TestFilterFunction<Driver> = (drivers: Driver[], status: string) => {
      return drivers.filter(driver => driver.status === status)
    }

    const result = filterByStatus(mockDrivers, 'available')

    expect(result).toHaveLength(1)
    expect(result[0].status).toBe('available')
  })

  it('calculates driver statistics correctly', () => {
    const calculateDriverStats: TestCalculationFunction<Driver> = (drivers: Driver[]) => {
      return {
        total: drivers.length,
        available: drivers.filter(d => d.status === 'available').length,
        onDelivery: drivers.filter(d => d.status === 'on-delivery').length,
        offDuty: drivers.filter(d => d.status === 'off-duty').length,
        suspended: drivers.filter(d => d.status === 'suspended').length,
        averageRating: drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length
      }
    }

    const stats = calculateDriverStats(mockDrivers)

    expect(stats.total).toBe(2)
    expect(stats.available).toBe(1)
    expect(stats.onDelivery).toBe(1)
    expect(stats.averageRating).toBe(4.65)
  })

  it('calculates driver performance', () => {
    const calculatePerformance = (driver: Driver): number => {
      return (driver.onTimeDeliveries / driver.totalDeliveries) * 100
    }

    const performance1 = calculatePerformance(mockDrivers[0])
    const performance2 = calculatePerformance(mockDrivers[1])

    expect(performance1).toBeCloseTo(94.67, 2)
    expect(performance2).toBeCloseTo(97.5, 2)
  })

  it('sorts drivers by rating', () => {
    const sortByRating: TestSortFunction<Driver> = (drivers: Driver[], ascending = false) => {
      return [...drivers].sort((a, b) => {
        return ascending ? a.rating - b.rating : b.rating - a.rating
      })
    }

    const result = sortByRating(mockDrivers, false)

    expect(result[0].rating).toBe(4.8)
    expect(result[1].rating).toBe(4.5)
  })

  it('applies multiple filters correctly', () => {
    const applyFilters = (drivers: Driver[], searchTerm: string, status: string) => {
      return drivers.filter(driver => {
        const matchesSearch = !searchTerm ||
          driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driver.license.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = !status || driver.status === status

        return matchesSearch && matchesStatus
      })
    }

    const result = applyFilters(mockDrivers, 'John', 'available')

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('John Smith')
  })

  it('returns correct status colors', () => {
    const getStatusColor = (status: string): string => {
      const colors: Record<string, string> = {
        available: 'success',
        'on-delivery': 'primary',
        'off-duty': 'warning',
        suspended: 'error'
      }

      return colors[status] || 'light'
    }

    expect(getStatusColor('available')).toBe('success')
    expect(getStatusColor('on-delivery')).toBe('primary')
    expect(getStatusColor('off-duty')).toBe('warning')
    expect(getStatusColor('suspended')).toBe('error')
  })

  it('returns correct status labels', () => {
    const getStatusLabel = (status: string): string => {
      const labels: Record<string, string> = {
        available: 'Disponible',
        'on-delivery': 'En Entrega',
        'off-duty': 'Fuera de Servicio',
        suspended: 'Suspendido'
      }

      return labels[status] || status
    }

    expect(getStatusLabel('available')).toBe('Disponible')
    expect(getStatusLabel('on-delivery')).toBe('En Entrega')
    expect(getStatusLabel('off-duty')).toBe('Fuera de Servicio')
    expect(getStatusLabel('suspended')).toBe('Suspendido')
  })
})
