<template>
  
  <router-view/>
  {{ webStore.web.title }}
</template>

<script setup>
import { useWebStore } from '@/stores/web.js';
const webStore = useWebStore()

console.log("webStore.web", webStore.web)
</script>

<style lang="scss" scoped>

</style>