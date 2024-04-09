<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.params.paperId) // 输出路由参数id


</script>

<template>
学生端：id: {{ $route.params.paperId }} <br>
</template>

<style scoped>

</style>