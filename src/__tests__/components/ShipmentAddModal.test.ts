import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ShipmentAddModal from '@/components/shipments/ShipmentAddModal.vue'
import { createPinia, setActivePinia } from 'pinia'

// Mock the store
vi.mock('@/store', () => ({
  useShipmentsStore: () => ({
    createShipment: vi.fn().mockResolvedValue({
      id: 'SH004',
      trackingNumber: 'TRK123456789',
      status: 'pending'
    })
  })
}))

describe('ShipmentAddModal', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly', () => {
    const wrapper = mount(ShipmentAddModal, {
      props: {
        drivers: [],
        vehicles: []
      }
    })

    expect(wrapper.find('h2').text()).toBe('Agregar Nuevo Envío')
    expect(wrapper.find('input[placeholder="TRK123456789"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Juan Pérez"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="juan@example.com"]').exists()).toBe(true)
  })

  it('has default form values', () => {
    const wrapper = mount(ShipmentAddModal, {
      props: {
        drivers: [],
        vehicles: []
      }
    })

    const form = wrapper.vm.form

    expect(form.trackingNumber).toBe('')
    expect(form.status).toBe('pending')
    expect(form.priority).toBe('medium')
    expect(form.currency).toBe('PEN')
    expect(form.value).toBe(0)
    expect(form.weight).toBe(0)
    expect(form.volume).toBe(0)
    expect(form.customer.name).toBe('')
    expect(form.customer.email).toBe('')
    expect(form.customer.phone).toBe('')
  })

  it('emits close event when cancel button is clicked', async () => {
    const wrapper = mount(ShipmentAddModal, {
      props: {
        drivers: [],
        vehicles: []
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('validates form correctly', () => {
    const wrapper = mount(ShipmentAddModal, {
      props: {
        drivers: [],
        vehicles: []
      }
    })

    // Empty form should be invalid
    expect(wrapper.vm.isFormValid).toBe(false)

    // Fill required fields
    wrapper.vm.form.trackingNumber = 'TRK123456789'
    wrapper.vm.form.customer.name = 'John Doe'
    wrapper.vm.form.customer.email = 'john@example.com'
    wrapper.vm.form.customer.phone = '123456789'
    wrapper.vm.form.origin.street = 'Test Street'
    wrapper.vm.form.origin.city = 'Test City'
    wrapper.vm.form.origin.state = 'Test State'
    wrapper.vm.form.origin.zipCode = '12345'
    wrapper.vm.form.origin.country = 'Perú'
    wrapper.vm.form.destination.street = 'Test Street 2'
    wrapper.vm.form.destination.city = 'Test City 2'
    wrapper.vm.form.destination.state = 'Test State 2'
    wrapper.vm.form.destination.zipCode = '54321'
    wrapper.vm.form.destination.country = 'Perú'
    wrapper.vm.form.weight = 10
    wrapper.vm.form.volume = 1
    wrapper.vm.form.value = 100

    expect(wrapper.vm.isFormValid).toBe(true)
  })

  it('accepts drivers and vehicles props', () => {
    const drivers = [
      { id: 'DR001', name: 'John Doe', license: 'ABC123', status: 'available' },
      { id: 'DR002', name: 'Jane Smith', license: 'DEF456', status: 'available' }
    ]

    const vehicles = [
      { id: 'VH001', brand: 'Mercedes', model: 'Actros', licensePlate: 'ABC123', status: 'available' },
      { id: 'VH002', brand: 'Volvo', model: 'FH', licensePlate: 'DEF456', status: 'available' }
    ]

    const wrapper = mount(ShipmentAddModal, {
      props: {
        drivers,
        vehicles
      }
    })

    expect(wrapper.props('drivers')).toEqual(drivers)
    expect(wrapper.props('vehicles')).toEqual(vehicles)
  })

  it('shows available drivers and vehicles in dropdowns', () => {
    const drivers = [
      { id: 'DR001', name: 'John Doe', license: 'ABC123', status: 'available' },
      { id: 'DR002', name: 'Jane Smith', license: 'DEF456', status: 'on-delivery' } // Not available
    ]

    const vehicles = [
      { id: 'VH001', brand: 'Mercedes', model: 'Actros', licensePlate: 'ABC123', status: 'available' },
      { id: 'VH002', brand: 'Volvo', model: 'FH', licensePlate: 'DEF456', status: 'maintenance' } // Not available
    ]

    const wrapper = mount(ShipmentAddModal, {
      props: {
        drivers,
        vehicles
      }
    })

    // Should only show available drivers and vehicles
    expect(wrapper.vm.availableDrivers).toHaveLength(1)
    expect(wrapper.vm.availableVehicles).toHaveLength(1)
    expect(wrapper.vm.availableDrivers[0].name).toBe('John Doe')
    expect(wrapper.vm.availableVehicles[0].brand).toBe('Mercedes')
  })
})
