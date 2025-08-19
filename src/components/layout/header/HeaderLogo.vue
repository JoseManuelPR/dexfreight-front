<template>
  <router-link to="/" class="lg:hidden">
    <img class="dark:hidden" src="/images/logo/logo.svg" alt="Logo" width="150" height="40" />
    <img class="hidden dark:block" src="/images/logo/logo-dark.svg" alt="Logo" width="150" height="40" />
  </router-link>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
