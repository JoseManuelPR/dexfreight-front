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
  },
  {
    id: 'S002',
    trackingNumber: 'TRK002',
    origin: {
      street: '789 Pine St',
      city: 'Valencia',
      state: 'Valencia',
      zipCode: '46001',
      country: 'Spain'
    },
    destination: {
      street: '321 Elm St',
      city: 'Sevilla',
      state: 'Sevilla',
      zipCode: '41001',
      country: 'Spain'
    },
    status: 'in_transit',
    priority: 'high',
    createdAt: '2024-01-02T15:30:00Z',
    scheduledPickup: '2024-01-03T08:00:00Z',
    estimatedDelivery: '2024-01-04T18:00:00Z',
    weight: 750,
    volume: 3.0,
    value: 2200,
    currency: 'EUR',
    goods: [
      {
        id: 'G002',
        description: 'Furniture',
        quantity: 5,
        unit: 'pieces',
        weight: 750,
        value: 2200,
        category: 'Furniture',
        fragile: true,
        hazardous: false
      }
    ],
    customer: {
      id: 'C002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+34 987 654 321',
      address: {
        street: '789 Pine St',
        city: 'Valencia',
        state: 'Valencia',
        zipCode: '46001',
        country: 'Spain'
      },
      accountType: 'business'
    },
    route: {
      distance: 350,
      estimatedTime: 6
    },
    notes: ['Fragile items']
  },
  {
    id: 'S003',
    trackingNumber: 'TRK003',
    origin: {
      street: '456 Oak Ave',
      city: 'Bilbao',
      state: 'Vizcaya',
      zipCode: '48001',
      country: 'Spain'
    },
    destination: {
      street: '123 Main St',
      city: 'Madrid',
      state: 'Madrid',
      zipCode: '28001',
      country: 'Spain'
    },
    status: 'delivered',
    priority: 'low',
    createdAt: '2024-01-03T09:15:00Z',
    scheduledPickup: '2024-01-04T10:00:00Z',
    estimatedDelivery: '2024-01-05T16:00:00Z',
    weight: 300,
    volume: 1.5,
    value: 800,
    currency: 'EUR',
    goods: [
      {
        id: 'G003',
        description: 'Books',
        quantity: 100,
        unit: 'pieces',
        weight: 300,
        value: 800,
        category: 'Books',
        fragile: false,
        hazardous: false
      }
    ],
    customer: {
      id: 'C003',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '+34 555 123 456',
      address: {
        street: '456 Oak Ave',
        city: 'Bilbao',
        state: 'Vizcaya',
        zipCode: '48001',
        country: 'Spain'
      },
      accountType: 'individual'
    },
    route: {
      distance: 400,
      estimatedTime: 7
    },
    notes: ['Standard delivery']
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

    expect(result).toHaveLength(3)
    expect(result[0].trackingNumber).toBe('TRK001')
    expect(result[1].trackingNumber).toBe('TRK002')
    expect(result[2].trackingNumber).toBe('TRK003')
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

  it('sorts shipments by creation date (most recent first)', () => {
    const sortByCreationDate = (shipments: Shipment[]): Shipment[] => {
      return shipments.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()

        return dateB - dateA
      })
    }

    const sortedShipments = sortByCreationDate([...mockShipments])

    expect(sortedShipments[0].id).toBe('S003')
    expect(sortedShipments[1].id).toBe('S002')
    expect(sortedShipments[2].id).toBe('S001')
  })
})
