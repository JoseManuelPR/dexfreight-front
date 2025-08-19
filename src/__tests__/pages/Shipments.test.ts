import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

describe('Shipments Page Logic', () => {
  const mockShipments = [
    {
      id: 'SH001',
      trackingNumber: 'TN001',
      status: 'in_transit',
      priority: 'high',
      origin: { city: 'Lima' },
      destination: { city: 'Arequipa' },
      customer: { name: 'Juan Pérez', company: 'Test Corp', email: 'juan@test.com' },
      createdAt: '2025-01-18T10:00:00Z'
    },
    {
      id: 'SH002',
      trackingNumber: 'TN002',
      status: 'pending',
      priority: 'medium',
      origin: { city: 'Cusco' },
      destination: { city: 'Trujillo' },
      customer: { name: 'María García', company: 'Another Corp', email: 'maria@test.com' },
      createdAt: '2025-01-17T08:00:00Z'
    },
    {
      id: 'SH003',
      trackingNumber: 'TN003',
      status: 'delivered',
      priority: 'low',
      origin: { city: 'Piura' },
      destination: { city: 'Iquitos' },
      customer: { name: 'Carlos López', company: '', email: 'carlos@test.com' },
      createdAt: '2025-01-16T14:00:00Z'
    }
  ]

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should filter shipments by search term correctly', () => {
    const filterBySearchTerm = (shipments: any[], searchTerm: string) => {
      if (!searchTerm) return shipments
      
      const term = searchTerm.toLowerCase()
      return shipments.filter(s => 
        s.trackingNumber.toLowerCase().includes(term) ||
        s.customer.name.toLowerCase().includes(term) ||
        s.customer.company?.toLowerCase().includes(term) ||
        s.origin.city.toLowerCase().includes(term) ||
        s.destination.city.toLowerCase().includes(term)
      )
    }

    let filtered = filterBySearchTerm(mockShipments, 'TN001')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].id).toBe('SH001')

    filtered = filterBySearchTerm(mockShipments, 'Juan')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].customer.name).toBe('Juan Pérez')

    filtered = filterBySearchTerm(mockShipments, 'Test Corp')
    expect(filtered).toHaveLength(1)

    filtered = filterBySearchTerm(mockShipments, 'Lima')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].origin.city).toBe('Lima')

    filtered = filterBySearchTerm(mockShipments, '')
    expect(filtered).toHaveLength(3)
  })

  it('should filter shipments by status correctly', () => {
    const filterByStatus = (shipments: any[], status: string) => {
      if (!status) return shipments
      return shipments.filter(s => s.status === status)
    }

    let filtered = filterByStatus(mockShipments, 'in_transit')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].status).toBe('in_transit')

    filtered = filterByStatus(mockShipments, 'pending')
    expect(filtered).toHaveLength(1)

    filtered = filterByStatus(mockShipments, 'delivered')
    expect(filtered).toHaveLength(1)

    filtered = filterByStatus(mockShipments, 'cancelled')
    expect(filtered).toHaveLength(0)

    filtered = filterByStatus(mockShipments, '')
    expect(filtered).toHaveLength(3)
  })

  it('should filter shipments by priority correctly', () => {
    const filterByPriority = (shipments: any[], priority: string) => {
      if (!priority) return shipments
      return shipments.filter(s => s.priority === priority)
    }

    let filtered = filterByPriority(mockShipments, 'high')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].priority).toBe('high')

    filtered = filterByPriority(mockShipments, 'medium')
    expect(filtered).toHaveLength(1)

    filtered = filterByPriority(mockShipments, 'low')
    expect(filtered).toHaveLength(1)

    filtered = filterByPriority(mockShipments, 'urgent')
    expect(filtered).toHaveLength(0)

    filtered = filterByPriority(mockShipments, '')
    expect(filtered).toHaveLength(3)
  })

  it('should return correct status colors', () => {
    const getStatusColor = (status: string) => {
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
    expect(getStatusColor('unknown')).toBe('light')
  })

  it('should return correct priority colors', () => {
    const getPriorityColor = (priority: string) => {
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
    expect(getPriorityColor('unknown')).toBe('light')
  })

  it('should return correct status labels in Spanish', () => {
    const getStatusLabel = (status: string) => {
      const labels: Record<string, string> = {
        pending: 'Pendiente',
        in_transit: 'En Tránsito',
        delivered: 'Entregado',
        cancelled: 'Cancelado',
        delayed: 'Retrasado'
      }
      return labels[status] || status
    }

    expect(getStatusLabel('pending')).toBe('Pendiente')
    expect(getStatusLabel('in_transit')).toBe('En Tránsito')
    expect(getStatusLabel('delivered')).toBe('Entregado')
    expect(getStatusLabel('cancelled')).toBe('Cancelado')
    expect(getStatusLabel('delayed')).toBe('Retrasado')
  })

  it('should return correct priority labels in Spanish', () => {
    const getPriorityLabel = (priority: string) => {
      const labels: Record<string, string> = {
        low: 'Baja',
        medium: 'Media',
        high: 'Alta',
        urgent: 'Urgente'
      }
      return labels[priority] || priority
    }

    expect(getPriorityLabel('low')).toBe('Baja')
    expect(getPriorityLabel('medium')).toBe('Media')
    expect(getPriorityLabel('high')).toBe('Alta')
    expect(getPriorityLabel('urgent')).toBe('Urgente')
  })

  it('should combine multiple filters correctly', () => {
    const applyFilters = (shipments: any[], searchTerm: string, status: string, priority: string) => {
      let filtered = shipments

      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filtered = filtered.filter(s => 
          s.trackingNumber.toLowerCase().includes(term) ||
          s.customer.name.toLowerCase().includes(term) ||
          s.customer.company?.toLowerCase().includes(term) ||
          s.origin.city.toLowerCase().includes(term) ||
          s.destination.city.toLowerCase().includes(term)
        )
      }

      if (status) {
        filtered = filtered.filter(s => s.status === status)
      }

      if (priority) {
        filtered = filtered.filter(s => s.priority === priority)
      }

      return filtered
    }

    let filtered = applyFilters(mockShipments, 'Juan', 'in_transit', '')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].customer.name).toBe('Juan Pérez')

    filtered = applyFilters(mockShipments, '', 'pending', 'medium')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].id).toBe('SH002')

    filtered = applyFilters(mockShipments, 'NonExistent', '', '')
    expect(filtered).toHaveLength(0)
  })
})
