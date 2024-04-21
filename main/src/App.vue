<template>

  <router-view />
  
</template>

<script setup>
// import { useWebStore } from '@/stores/web.js';
import { onMounted } from 'vue';

onMounted(()=>{
  console.log(111);
})
// import { useRouter,useRoute } from 'vue-router';

// const route = useRouter()
// const router = useRoute()
// const webStore = useWebStore()

// onMounted(async () =>{
//   if(webStore.info.isLogin === true){
//     if(webStore.info.id === 0){
//       route.push("/student")
//     }
//     if(webStore.info.id ===1){
//       route.push("/teacher")
//     }
//   }else{
//     if(route.path !=='/register'){
//       console.log(router.path)
//       route.push("/login")
//     }
    
//   }
// })

</script>

<style lang="scss" scoped></style>