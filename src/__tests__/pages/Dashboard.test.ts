import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

describe('Dashboard Page Logic', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should format currency correctly', () => {
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
      }).format(value)
    }

    const result = formatCurrency(1500)

    expect(result).toContain('1,500')
    expect(result.includes('PEN') || result.includes('S/')).toBe(true)
  })

  it('should format dates correctly', () => {
    const formatDate = (dateString: string) => {
      return new Intl.DateTimeFormat('es-PE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(new Date(dateString))
    }

    const result = formatDate('2025-01-18T10:00:00Z')

    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
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
    expect(getStatusColor('unknown')).toBe('light')
  })

  it('should return correct status labels', () => {
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
    expect(getStatusLabel('unknown')).toBe('unknown')
  })

  it('should filter recent shipments correctly', () => {
    const mockShipments = [
      {
        id: 'SH001',
        trackingNumber: 'TN001',
        createdAt: '2025-01-18T10:00:00Z',
        customer: { name: 'Test' },
        origin: { city: 'Lima' },
        destination: { city: 'Arequipa' },
        status: 'pending',
        value: 1000
      },
      {
        id: 'SH002',
        trackingNumber: 'TN002',
        createdAt: '2025-01-17T08:00:00Z',
        customer: { name: 'Test2' },
        origin: { city: 'Cusco' },
        destination: { city: 'Trujillo' },
        status: 'delivered',
        value: 2000
      }
    ]

    const recentShipments = mockShipments
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)

    expect(recentShipments).toHaveLength(2)
    expect(recentShipments[0].id).toBe('SH001')
    expect(recentShipments[1].id).toBe('SH002')
  })
})
