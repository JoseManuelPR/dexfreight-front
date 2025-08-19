import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

describe('Drivers Page Logic', () => {
  const mockDrivers = [
    {
      id: 'DR001',
      name: 'Carlos González',
      email: 'carlos@test.com',
      phone: '+51 987 654 321',
      license: 'Q12345678',
      status: 'available',
      rating: 4.8,
      totalDeliveries: 145,
      onTimeDeliveries: 138
    },
    {
      id: 'DR002',
      name: 'Ana Rodríguez',
      email: 'ana@test.com',
      phone: '+51 976 543 210',
      license: 'Q87654321',
      status: 'on-delivery',
      rating: 4.9,
      totalDeliveries: 67,
      onTimeDeliveries: 65
    },
    {
      id: 'DR003',
      name: 'Miguel Hernández',
      email: 'miguel@test.com',
      phone: '+51 965 432 109',
      license: 'Q45678912',
      status: 'off-duty',
      rating: 4.2,
      totalDeliveries: 78,
      onTimeDeliveries: 70
    }
  ]

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should filter drivers by search term correctly', () => {
    const filterBySearchTerm = (drivers: any[], searchTerm: string) => {
      if (!searchTerm) return drivers
      
      const term = searchTerm.toLowerCase()
      return drivers.filter(d => 
        d.name.toLowerCase().includes(term) ||
        d.email.toLowerCase().includes(term) ||
        d.phone.includes(term) ||
        d.license.toLowerCase().includes(term)
      )
    }

    let filtered = filterBySearchTerm(mockDrivers, 'Carlos')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].name).toBe('Carlos González')

    filtered = filterBySearchTerm(mockDrivers, 'ana@test.com')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].name).toBe('Ana Rodríguez')

    filtered = filterBySearchTerm(mockDrivers, '987 654 321')
    expect(filtered).toHaveLength(1)

    filtered = filterBySearchTerm(mockDrivers, 'Q12345678')
    expect(filtered).toHaveLength(1)

    filtered = filterBySearchTerm(mockDrivers, 'Miguel')
    expect(filtered).toHaveLength(1)

    filtered = filterBySearchTerm(mockDrivers, '')
    expect(filtered).toHaveLength(3)
  })

  it('should filter drivers by status correctly', () => {
    const filterByStatus = (drivers: any[], status: string) => {
      if (!status) return drivers
      return drivers.filter(d => d.status === status)
    }

    let filtered = filterByStatus(mockDrivers, 'available')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].status).toBe('available')

    filtered = filterByStatus(mockDrivers, 'on-delivery')
    expect(filtered).toHaveLength(1)

    filtered = filterByStatus(mockDrivers, 'off-duty')
    expect(filtered).toHaveLength(1)

    filtered = filterByStatus(mockDrivers, 'suspended')
    expect(filtered).toHaveLength(0)

    filtered = filterByStatus(mockDrivers, '')
    expect(filtered).toHaveLength(3)
  })

  it('should return correct status colors', () => {
    const getStatusColor = (status: string) => {
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
    expect(getStatusColor('unknown')).toBe('light')
  })

  it('should return correct status labels in Spanish', () => {
    const getStatusLabel = (status: string) => {
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

  it('should calculate driver statistics correctly', () => {
    const calculateDriverStats = (drivers: any[]) => {
      return {
        total: drivers.length,
        available: drivers.filter(d => d.status === 'available').length,
        onDelivery: drivers.filter(d => d.status === 'on-delivery').length,
        offDuty: drivers.filter(d => d.status === 'off-duty').length,
        suspended: drivers.filter(d => d.status === 'suspended').length
      }
    }

    const stats = calculateDriverStats(mockDrivers)
    expect(stats.total).toBe(3)
    expect(stats.available).toBe(1)
    expect(stats.onDelivery).toBe(1)
    expect(stats.offDuty).toBe(1)
    expect(stats.suspended).toBe(0)
  })

  it('should extract driver initials correctly', () => {
    const getDriverInitials = (name: string) => {
      return name.charAt(0).toUpperCase()
    }

    expect(getDriverInitials('Carlos González')).toBe('C')
    expect(getDriverInitials('Ana Rodríguez')).toBe('A')
    expect(getDriverInitials('miguel hernández')).toBe('M')
    expect(getDriverInitials('')).toBe('')
  })

  it('should calculate driver performance metrics', () => {
    const calculatePerformance = (driver: any) => {
      if (driver.totalDeliveries === 0) return 0
      return (driver.onTimeDeliveries / driver.totalDeliveries) * 100
    }

    expect(calculatePerformance(mockDrivers[0])).toBeCloseTo(95.17, 1) // Carlos
    expect(calculatePerformance(mockDrivers[1])).toBeCloseTo(97.01, 1) // Ana
    expect(calculatePerformance(mockDrivers[2])).toBeCloseTo(89.74, 1) // Miguel
    
    const newDriver = { totalDeliveries: 0, onTimeDeliveries: 0 }
    expect(calculatePerformance(newDriver)).toBe(0)
  })

  it('should sort drivers by rating correctly', () => {
    const sortByRating = (drivers: any[], ascending = false) => {
      return [...drivers].sort((a, b) => 
        ascending ? a.rating - b.rating : b.rating - a.rating
      )
    }

    const sortedDesc = sortByRating(mockDrivers, false)
    expect(sortedDesc[0].rating).toBe(4.9) // Ana first
    expect(sortedDesc[1].rating).toBe(4.8) // Carlos second
    expect(sortedDesc[2].rating).toBe(4.2) // Miguel last

    const sortedAsc = sortByRating(mockDrivers, true)
    expect(sortedAsc[0].rating).toBe(4.2) // Miguel first
    expect(sortedAsc[2].rating).toBe(4.9) // Ana last
  })

  it('should combine search and status filters correctly', () => {
    const applyFilters = (drivers: any[], searchTerm: string, status: string) => {
      let filtered = drivers

      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filtered = filtered.filter(d => 
          d.name.toLowerCase().includes(term) ||
          d.email.toLowerCase().includes(term) ||
          d.phone.includes(term) ||
          d.license.toLowerCase().includes(term)
        )
      }

      if (status) {
        filtered = filtered.filter(d => d.status === status)
      }

      return filtered
    }

    let filtered = applyFilters(mockDrivers, 'Ana', 'on-delivery')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].name).toBe('Ana Rodríguez')

    filtered = applyFilters(mockDrivers, 'Ana', 'available')
    expect(filtered).toHaveLength(0)

    filtered = applyFilters(mockDrivers, '', 'available')
    expect(filtered).toHaveLength(1)
  })
})
