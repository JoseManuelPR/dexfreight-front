import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DriverAddModal from '@/components/drivers/DriverAddModal.vue'
import { createPinia, setActivePinia } from 'pinia'

// Mock the store
vi.mock('@/store', () => ({
  useDriversStore: () => ({
    createDriver: vi.fn().mockResolvedValue({
      id: 'DR004',
      name: 'Test Driver',
      email: 'test@example.com',
      license: 'TEST123'
    })
  })
}))

describe('DriverAddModal', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly', () => {
    const wrapper = mount(DriverAddModal, {
      props: {
        vehicles: []
      }
    })

    expect(wrapper.find('h2').text()).toBe('Agregar Nuevo Conductor')
    expect(wrapper.find('input[placeholder="Juan Pérez"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="juan@example.com"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="+51 123 456 789"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="ABC123456"]').exists()).toBe(true)
  })

  it('has default form values', () => {
    const wrapper = mount(DriverAddModal, {
      props: {
        vehicles: []
      }
    })

    const form = wrapper.vm.form

    expect(form.name).toBe('')
    expect(form.email).toBe('')
    expect(form.phone).toBe('')
    expect(form.license).toBe('')
    expect(form.status).toBe('available')
    expect(form.rating).toBe(5.0)
    expect(form.totalDeliveries).toBe(0)
    expect(form.onTimeDeliveries).toBe(0)
  })

  it('emits close event when cancel button is clicked', async () => {
    const wrapper = mount(DriverAddModal, {
      props: {
        vehicles: []
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('validates form correctly', () => {
    const wrapper = mount(DriverAddModal, {
      props: {
        vehicles: []
      }
    })

    // Empty form should be invalid
    expect(wrapper.vm.isFormValid).toBe(false)

    // Fill required fields
    wrapper.vm.form.name = 'John Doe'
    wrapper.vm.form.email = 'john@example.com'
    wrapper.vm.form.phone = '123456789'
    wrapper.vm.form.license = 'ABC123'

    expect(wrapper.vm.isFormValid).toBe(true)
  })

  it('validates on-time deliveries correctly', () => {
    const wrapper = mount(DriverAddModal, {
      props: {
        vehicles: []
      }
    })

    // Fill required fields
    wrapper.vm.form.name = 'John Doe'
    wrapper.vm.form.email = 'john@example.com'
    wrapper.vm.form.phone = '123456789'
    wrapper.vm.form.license = 'ABC123'
    wrapper.vm.form.totalDeliveries = 10
    wrapper.vm.form.onTimeDeliveries = 15 // More than total deliveries

    expect(wrapper.vm.isFormValid).toBe(false)

    // Fix the on-time deliveries
    wrapper.vm.form.onTimeDeliveries = 8

    expect(wrapper.vm.isFormValid).toBe(true)
  })

  it('accepts vehicles prop', () => {
    const vehicles = [
      { id: 'VH001', brand: 'Mercedes', model: 'Actros', licensePlate: 'ABC123', status: 'available', currentDriverId: null },
      { id: 'VH002', brand: 'Volvo', model: 'FH', licensePlate: 'DEF456', status: 'available', currentDriverId: null }
    ]

    const wrapper = mount(DriverAddModal, {
      props: {
        vehicles
      }
    })

    expect(wrapper.props('vehicles')).toEqual(vehicles)
  })
})
