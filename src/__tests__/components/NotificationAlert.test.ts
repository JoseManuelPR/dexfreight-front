import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NotificationAlert from '@/components/ui/NotificationAlert.vue'

describe('NotificationAlert', () => {
  it('renders when show is true', () => {
    const wrapper = mount(NotificationAlert, {
      props: {
        show: true
      }
    })

    expect(wrapper.find('.fixed').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'Alert' }).exists()).toBe(true)
  })

  it('does not render when show is false', () => {
    const wrapper = mount(NotificationAlert, {
      props: {
        show: false
      }
    })

    expect(wrapper.find('.fixed').exists()).toBe(false)
  })

  it('uses default props', () => {
    const wrapper = mount(NotificationAlert, {
      props: {
        show: true
      }
    })

    const alert = wrapper.findComponent({ name: 'Alert' })

    expect(alert.props('variant')).toBe('success')
    expect(alert.props('title')).toBe('¡Operación exitosa!')
    expect(alert.props('message')).toBe('La operación se ha completado correctamente.')
  })

  it('uses custom title and message', () => {
    const wrapper = mount(NotificationAlert, {
      props: {
        show: true,
        title: '¡Vehículo actualizado!',
        message: 'El vehículo ha sido editado exitosamente.'
      }
    })

    const alert = wrapper.findComponent({ name: 'Alert' })

    expect(alert.props('title')).toBe('¡Vehículo actualizado!')
    expect(alert.props('message')).toBe('El vehículo ha sido editado exitosamente.')
  })

  it('supports success variant', () => {
    const wrapper = mount(NotificationAlert, {
      props: {
        show: true,
        variant: 'success'
      }
    })

    const alert = wrapper.findComponent({ name: 'Alert' })

    expect(alert.props('variant')).toBe('success')
  })

  it('supports info variant', () => {
    const wrapper = mount(NotificationAlert, {
      props: {
        show: true,
        variant: 'info'
      }
    })

    const alert = wrapper.findComponent({ name: 'Alert' })

    expect(alert.props('variant')).toBe('info')
  })

  it('supports warning variant', () => {
    const wrapper = mount(NotificationAlert, {
      props: {
        show: true,
        variant: 'warning'
      }
    })

    const alert = wrapper.findComponent({ name: 'Alert' })

    expect(alert.props('variant')).toBe('warning')
  })

  it('supports error variant', () => {
    const wrapper = mount(NotificationAlert, {
      props: {
        show: true,
        variant: 'error'
      }
    })

    const alert = wrapper.findComponent({ name: 'Alert' })

    expect(alert.props('variant')).toBe('error')
  })

  it('has correct positioning classes', () => {
    const wrapper = mount(NotificationAlert, {
      props: {
        show: true
      }
    })

    const container = wrapper.find('.fixed')

    expect(container.classes()).toContain('bottom-4')
    expect(container.classes()).toContain('right-4')
    expect(container.classes()).toContain('z-[9999]')
    expect(container.classes()).toContain('max-w-sm')
  })

  it('passes all props correctly to Alert component', () => {
    const wrapper = mount(NotificationAlert, {
      props: {
        show: true,
        variant: 'warning',
        title: '¡Advertencia!',
        message: 'Este es un mensaje de advertencia.'
      }
    })

    const alert = wrapper.findComponent({ name: 'Alert' })

    expect(alert.props('variant')).toBe('warning')
    expect(alert.props('title')).toBe('¡Advertencia!')
    expect(alert.props('message')).toBe('Este es un mensaje de advertencia.')
  })
})
