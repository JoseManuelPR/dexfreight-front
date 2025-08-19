<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <ecommerce-metrics />
      </div>

      <div class="col-span-12">
        <recent-orders />
      </div>
    </div>
  </admin-layout>
</template>

<script lang="ts">
import AdminLayout from '../components/layout/AdminLayout.vue'
import EcommerceMetrics from '../components/ecommerce/EcommerceMetrics.vue'
import RecentOrders from '../components/ecommerce/RecentOrders.vue'
export default { 
  components: {
    AdminLayout,
    EcommerceMetrics,
    RecentOrders,
  },
  name: 'EcommerceView',
}
</script>
