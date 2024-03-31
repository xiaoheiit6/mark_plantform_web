<template>
<a-flex gap="middle"   vertical>
    <div style="display: flex; gap: 20px" >
        <div >问题  {{ problem }}</div>
        <a-textarea v-model:value="value" placeholder="请输入问题" :rows="3"  allow-clear/>
        <a-textarea v-model:value="value" placeholder="请输入答案" :rows="4" allow-clear/>
        <a-button>Default Button</a-button>
    </div>
    

</a-flex>
</template>

<script setup>
import { ref } from 'vue';

const problem = ref("一")

</script>

<style scoped>

</style>