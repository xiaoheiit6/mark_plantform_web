<template>

  <router-view />
  
</template>

<script setup>
import { useWebStore } from '@/stores/web.js';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const route = useRouter()
const webStore = useWebStore()

onMounted(async () =>{
  if(webStore.info.isLogin === true){
    if(webStore.info.id === 0){
      route.push("/student")
    }
    if(webStore.info.id ===1){
      route.push("/teacher")
    }
  }else{
    route.push("/login")
  }
})

</script>

<style lang="scss" scoped></style>