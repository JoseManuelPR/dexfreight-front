<template>
  <div v-if="show" class="fixed bottom-4 right-4 z-[9999] max-w-sm">
    <Alert
      :variant="variant"
      :title="title"
      :message="message"
    />
  </div>
</template>

<script setup lang="ts">
import Alert from '@/components/ui/Alert.vue'

interface Props {
  show: boolean
  variant?: 'success' | 'info' | 'warning' | 'error'
  title?: string
  message?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'success',
  title: '¡Operación exitosa!',
  message: 'La operación se ha completado correctamente.'
})
</script>
