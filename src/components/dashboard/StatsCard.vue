<template>
  <div class="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-theme-sm border border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
          {{ title }}
        </p>
        <p class="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
          {{ formattedValue }}
        </p>
        <div v-if="trend" class="mt-2 flex items-center gap-1">
          <component 
            :is="trendIcon" 
            :class="trendColorClass"
            class="h-4 w-4"
          />
          <span :class="trendColorClass" class="text-sm font-medium">
            {{ trend }}
          </span>
        </div>
      </div>
      <div :class="iconBackgroundClass" class="flex h-12 w-12 items-center justify-center rounded-lg">
        <component :is="iconComponent" class="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BoxIcon from '@/icons/BoxIcon.vue'
import HomeIcon from '@/icons/HomeIcon.vue'
import CheckIcon from '@/icons/CheckIcon.vue'
import UserGroupIcon from '@/icons/UserGroupIcon.vue'

// Props
interface StatsCardProps {
  title: string
  value: string | number
  icon: string
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red'
  trend?: string
  trendType?: 'up' | 'down'
}

const props = withDefaults(defineProps<StatsCardProps>(), {
  color: 'blue'
})

// Icon mapping
const iconMap: Record<string, any> = {
  BoxIcon,
  TruckIcon: BoxIcon, // Using BoxIcon as placeholder for truck
  CheckIcon,
  CurrencyIcon: HomeIcon, // Using HomeIcon as placeholder for currency
  UserGroupIcon
}

// Computed
const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString()
  }
  return props.value
})

const iconComponent = computed(() => {
  return iconMap[props.icon] || BoxIcon
})

const iconBackgroundClass = computed(() => {
  const colors = {
    blue: 'bg-orange-500',
    green: 'bg-success-500',
    purple: 'bg-theme-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-error-500'
  }
  return colors[props.color]
})

const trendIcon = computed(() => {
  return props.trendType === 'up' ? 'TrendUpIcon' : 'TrendDownIcon'
})

const trendColorClass = computed(() => {
  return props.trendType === 'up' 
    ? 'text-success-500' 
    : 'text-error-500'
})
</script>
