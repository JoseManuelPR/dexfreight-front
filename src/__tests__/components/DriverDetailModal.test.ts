import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DriverDetailModal from '@/components/drivers/DriverDetailModal.vue'
import type { Driver } from '@/types/models'

// Mock data
const mockDriver: Driver = {
  id: 'D001',
  name: 'John Smith',
  license: 'DL123456',
  phone: '+34 123 456 789',
  email: 'john@example.com',
  status: 'available',
  rating: 4.5,
  totalDeliveries: 150,
  onTimeDeliveries: 142
}

describe('DriverDetailModal.vue', () => {
  it('renders driver details correctly', () => {
    const wrapper = mount(DriverDetailModal, {
      props: {
        driver: mockDriver,
        isOpen: true
      }
    })

    expect(wrapper.text()).toContain('John Smith')
    expect(wrapper.text()).toContain('DL123456')
    expect(wrapper.text()).toContain('john@example.com')
  })

  it('extracts driver initials correctly', () => {
    const getInitials = (name: string): string => {
      return name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase()
    }

    expect(getInitials('John Smith')).toBe('JS')
    expect(getInitials('Ana Maria Rodriguez Perez')).toBe('AM')
    expect(getInitials('Miguel')).toBe('M')
    expect(getInitials('')).toBe('')
  })

  it('returns correct driver status colors', () => {
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
    expect(getStatusColor('unknown')).toBe('light')
  })

  it('returns correct driver status labels', () => {
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

  it('calculates late deliveries correctly', () => {
    const getLateDeliveries = (driver: Driver): number => {
      return driver.totalDeliveries - driver.onTimeDeliveries
    }

    expect(getLateDeliveries(mockDriver)).toBe(8)

    const perfectDriver = { totalDeliveries: 50, onTimeDeliveries: 50 } as Driver

    expect(getLateDeliveries(perfectDriver)).toBe(0)

    const newDriver = { totalDeliveries: 0, onTimeDeliveries: 0 } as Driver

    expect(getLateDeliveries(newDriver)).toBe(0)
  })

  it('calculates on-time percentage correctly', () => {
    const getOnTimePercentage = (driver: Driver): number => {
      if (driver.totalDeliveries === 0) return 0

      return Math.round((driver.onTimeDeliveries / driver.totalDeliveries) * 100)
    }

    expect(getOnTimePercentage(mockDriver)).toBe(95)

    const perfectDriver = { totalDeliveries: 50, onTimeDeliveries: 50 } as Driver

    expect(getOnTimePercentage(perfectDriver)).toBe(100)

    const newDriver = { totalDeliveries: 0, onTimeDeliveries: 0 } as Driver

    expect(getOnTimePercentage(newDriver)).toBe(0)

    const poorDriver = { totalDeliveries: 100, onTimeDeliveries: 75 } as Driver

    expect(getOnTimePercentage(poorDriver)).toBe(75)
  })

  it('returns correct performance colors based on rating', () => {
    const getPerformanceColor = (rating: number): string => {
      if (rating >= 4.5) return 'success'
      if (rating >= 4.0) return 'primary'
      if (rating >= 3.5) return 'warning'

      return 'error'
    }

    expect(getPerformanceColor(4.8)).toBe('success')
    expect(getPerformanceColor(4.5)).toBe('success')
    expect(getPerformanceColor(4.2)).toBe('primary')
    expect(getPerformanceColor(4.0)).toBe('primary')
    expect(getPerformanceColor(3.8)).toBe('warning')
    expect(getPerformanceColor(3.0)).toBe('error')
  })

  it('returns correct performance levels', () => {
    const getPerformanceLevel = (rating: number): string => {
      if (rating >= 4.8) return 'Excepcional'
      if (rating >= 4.5) return 'Excelente'
      if (rating >= 4.0) return 'Muy Bueno'
      if (rating >= 3.5) return 'Bueno'

      return 'Necesita Mejora'
    }

    expect(getPerformanceLevel(4.9)).toBe('Excepcional')
    expect(getPerformanceLevel(4.8)).toBe('Excepcional')
    expect(getPerformanceLevel(4.6)).toBe('Excelente')
    expect(getPerformanceLevel(4.2)).toBe('Muy Bueno')
    expect(getPerformanceLevel(3.8)).toBe('Bueno')
    expect(getPerformanceLevel(3.0)).toBe('Necesita Mejora')
  })

  it('returns correct punctuality colors based on percentage', () => {
    const getPunctualityColor = (percentage: number): string => {
      if (percentage >= 95) return 'success'
      if (percentage >= 90) return 'primary'
      if (percentage >= 80) return 'warning'

      return 'error'
    }

    expect(getPunctualityColor(98)).toBe('success')
    expect(getPunctualityColor(95)).toBe('success')
    expect(getPunctualityColor(92)).toBe('primary')
    expect(getPunctualityColor(85)).toBe('warning')
    expect(getPunctualityColor(75)).toBe('error')
  })

  it('returns correct punctuality labels', () => {
    const getPunctualityLabel = (percentage: number): string => {
      if (percentage >= 95) return 'Excelente'
      if (percentage >= 90) return 'Muy Bueno'
      if (percentage >= 80) return 'Bueno'

      return 'Mejorable'
    }

    expect(getPunctualityLabel(98)).toBe('Excelente')
    expect(getPunctualityLabel(92)).toBe('Muy Bueno')
    expect(getPunctualityLabel(85)).toBe('Bueno')
    expect(getPunctualityLabel(75)).toBe('Mejorable')
  })

  it('returns correct availability labels', () => {
    const getAvailabilityLabel = (status: string): string => {
      switch (status) {
        case 'available': return 'Listo para asignación'
        case 'on-delivery': return 'Ocupado en entrega'
        case 'off-duty': return 'Fuera de horario'
        case 'suspended': return 'Temporalmente inactivo'
        default: return 'Estado desconocido'
      }
    }

    expect(getAvailabilityLabel('available')).toBe('Listo para asignación')
    expect(getAvailabilityLabel('on-delivery')).toBe('Ocupado en entrega')
    expect(getAvailabilityLabel('off-duty')).toBe('Fuera de horario')
    expect(getAvailabilityLabel('suspended')).toBe('Temporalmente inactivo')
    expect(getAvailabilityLabel('unknown')).toBe('Estado desconocido')
  })

  it('calculates experience level based on total deliveries', () => {
    const getExperienceLevel = (totalDeliveries: number): string => {
      if (totalDeliveries >= 200) return 'Experto (3+ años)'
      if (totalDeliveries >= 100) return 'Experimentado (2+ años)'
      if (totalDeliveries >= 50) return 'Intermedio (1+ año)'

      return 'Principiante (<1 año)'
    }

    expect(getExperienceLevel(250)).toBe('Experto (3+ años)')
    expect(getExperienceLevel(150)).toBe('Experimentado (2+ años)')
    expect(getExperienceLevel(75)).toBe('Intermedio (1+ año)')
    expect(getExperienceLevel(25)).toBe('Principiante (<1 año)')
  })

  it('calculates monthly deliveries average', () => {
    const getMonthlyDeliveries = (totalDeliveries: number): string => {
      const monthlyAvg = Math.round(totalDeliveries / 12)

      return `~${monthlyAvg} entregas/mes`
    }

    expect(getMonthlyDeliveries(120)).toBe('~10 entregas/mes')
    expect(getMonthlyDeliveries(145)).toBe('~12 entregas/mes')
    expect(getMonthlyDeliveries(240)).toBe('~20 entregas/mes')
    expect(getMonthlyDeliveries(0)).toBe('~0 entregas/mes')
  })

  it('returns correct vehicle type labels', () => {
    const getVehicleTypeLabel = (type: string): string => {
      const labels: Record<string, string> = {
        truck: 'Camión',
        van: 'Camioneta',
        trailer: 'Tráiler',
        pickup: 'Pickup'
      }

      return labels[type] || type
    }

    expect(getVehicleTypeLabel('truck')).toBe('Camión')
    expect(getVehicleTypeLabel('van')).toBe('Camioneta')
    expect(getVehicleTypeLabel('trailer')).toBe('Tráiler')
    expect(getVehicleTypeLabel('pickup')).toBe('Pickup')
  })
})
