import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import VehicleAddModal from '@/components/vehicles/VehicleAddModal.vue'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('@/store', () => ({
  useVehiclesStore: () => ({
    createVehicle: vi.fn().mockResolvedValue({
      id: 'VH004',
      brand: 'Test Brand',
      model: 'Test Model',
      licensePlate: 'TEST-123'
    })
  })
}))

describe('VehicleAddModal', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly', () => {
    const wrapper = mount(VehicleAddModal, {
      props: {
        drivers: []
      }
    })

    expect(wrapper.find('h2').text()).toBe('Agregar Nuevo Vehículo')
    expect(wrapper.find('input[placeholder="Ej: Mercedes-Benz"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Ej: Actros"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="ABC-123"]').exists()).toBe(true)
  })

  it('has default form values', () => {
    const wrapper = mount(VehicleAddModal, {
      props: {
        drivers: []
      }
    })

    const form = wrapper.vm.form

    expect(form.brand).toBe('')
    expect(form.model).toBe('')
    expect(form.year).toBe(new Date().getFullYear())
    expect(form.licensePlate).toBe('')
    expect(form.type).toBe('truck')
    expect(form.status).toBe('available')
  })

  it('emits close event when cancel button is clicked', async () => {
    const wrapper = mount(VehicleAddModal, {
      props: {
        drivers: []
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('accepts drivers prop', () => {
    const drivers = [
      { id: 'DR001', name: 'John Doe', license: 'ABC123', status: 'available', currentVehicle: null },
      { id: 'DR002', name: 'Jane Smith', license: 'DEF456', status: 'available', currentVehicle: null }
    ]

    const wrapper = mount(VehicleAddModal, {
      props: {
        drivers
      }
    })

    expect(wrapper.props('drivers')).toEqual(drivers)
  })
})
