<template>

  <router-view />
  
</template>

<script setup>
import { useWebStore } from '@/stores/web.js';
const webStore = useWebStore()


const test = () => {
  webStore.info.isLogin = true;
}



</script>

<style lang="scss" scoped></style>