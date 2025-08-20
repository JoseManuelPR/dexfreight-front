import { describe, it, expect } from 'vitest'
import type { Shipment, TestFilterFunction } from '@/types/models'

// Mock data
const mockShipments: Shipment[] = [
  {
    id: 'S001',
    trackingNumber: 'TRK001',
    origin: {
      street: '123 Main St',
      city: 'Madrid',
      state: 'Madrid',
      zipCode: '28001',
      country: 'Spain'
    },
    destination: {
      street: '456 Oak Ave',
      city: 'Barcelona',
      state: 'Barcelona',
      zipCode: '08001',
      country: 'Spain'
    },
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-01-01T10:00:00Z',
    scheduledPickup: '2024-01-02T09:00:00Z',
    estimatedDelivery: '2024-01-03T17:00:00Z',
    weight: 500,
    volume: 2.5,
    value: 1500,
    currency: 'EUR',
    goods: [
      {
        id: 'G001',
        description: 'Electronics',
        quantity: 10,
        unit: 'pieces',
        weight: 500,
        value: 1500,
        category: 'Electronics',
        fragile: true,
        hazardous: false
      }
    ],
    customer: {
      id: 'C001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+34 123 456 789',
      address: {
        street: '123 Main St',
        city: 'Madrid',
        state: 'Madrid',
        zipCode: '28001',
        country: 'Spain'
      },
      accountType: 'individual'
    },
    route: {
      distance: 500,
      estimatedTime: 8
    },
    notes: ['Handle with care']
  }
]

describe('Shipments Logic', () => {
  it('filters shipments by search term', () => {
    const filterBySearchTerm: TestFilterFunction<Shipment> = (shipments: Shipment[], searchTerm: string) => {
      return shipments.filter(shipment => 
        shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.origin.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.destination.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    const result = filterBySearchTerm(mockShipments, 'TRK')
    expect(result).toHaveLength(1)
    expect(result[0].trackingNumber).toBe('TRK001')
  })

  it('filters shipments by status', () => {
    const filterByStatus: TestFilterFunction<Shipment> = (shipments: Shipment[], status: string) => {
      return shipments.filter(shipment => shipment.status === status)
    }

    const result = filterByStatus(mockShipments, 'pending')
    expect(result).toHaveLength(1)
    expect(result[0].status).toBe('pending')
  })

  it('filters shipments by priority', () => {
    const filterByPriority: TestFilterFunction<Shipment> = (shipments: Shipment[], priority: string) => {
      return shipments.filter(shipment => shipment.priority === priority)
    }

    const result = filterByPriority(mockShipments, 'medium')
    expect(result).toHaveLength(1)
    expect(result[0].priority).toBe('medium')
  })

  it('applies multiple filters correctly', () => {
    const applyFilters = (shipments: Shipment[], searchTerm: string, status: string, priority: string) => {
      return shipments.filter(shipment => {
        const matchesSearch = !searchTerm || 
          shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shipment.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        
        const matchesStatus = !status || shipment.status === status
        const matchesPriority = !priority || shipment.priority === priority
        
        return matchesSearch && matchesStatus && matchesPriority
      })
    }

    const result = applyFilters(mockShipments, 'TRK', 'pending', 'medium')
    expect(result).toHaveLength(1)
    expect(result[0].trackingNumber).toBe('TRK001')
  })

  it('returns correct status colors', () => {
    const getStatusColor = (status: string): string => {
      const colors: Record<string, string> = {
        pending: 'warning',
        in_transit: 'primary',
        delivered: 'success',
        cancelled: 'error',
        delayed: 'error'
      }
      return colors[status] || 'light'
    }

    expect(getStatusColor('pending')).toBe('warning')
    expect(getStatusColor('in_transit')).toBe('primary')
    expect(getStatusColor('delivered')).toBe('success')
    expect(getStatusColor('cancelled')).toBe('error')
    expect(getStatusColor('delayed')).toBe('error')
  })

  it('returns correct priority colors', () => {
    const getPriorityColor = (priority: string): string => {
      const colors: Record<string, string> = {
        low: 'light',
        medium: 'primary',
        high: 'warning',
        urgent: 'error'
      }
      return colors[priority] || 'light'
    }

    expect(getPriorityColor('low')).toBe('light')
    expect(getPriorityColor('medium')).toBe('primary')
    expect(getPriorityColor('high')).toBe('warning')
    expect(getPriorityColor('urgent')).toBe('error')
  })

  it('validates address format correctly', () => {
    const validateAddressFormat = (address: Shipment['origin']): boolean => {
      return !!(address.street && address.city && address.state && address.zipCode && address.country)
    }

    const isValid = validateAddressFormat(mockShipments[0].origin)
    expect(isValid).toBe(true)
  })
})
