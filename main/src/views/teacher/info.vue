<template>
    <a-flex gap="middle" align="start" vertical>
        <a-segmented v-model:value="justify" />
        <a-segmented v-model:value="alignItems" />
        <a-flex :style="{ ...boxStyle }" :justify="justify" :align="alignItems"  >
            
            <a-card title="个人信息:" style="width: 300px" class="background">
                <div style="display: flex; justify-content: center; width: 100%;">
                <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }"
                src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" 
                >
                    <template #icon>
                        <AntDesignOutlined />
                    </template>
                </a-avatar>
            </div>
                <a-divider />
                <p>用户名:</p>
                <a-divider />
                <p>邮箱:</p>
            </a-card>
            <br />
            <a-card size="small" title="Small size card" style="width: 300px" class="background">
                <template #extra><a href="#">more</a></template>
                <a-divider />
                <p>职工编号：</p>
                <a-divider />
                <p>电话号码：</p>
                <a-divider />
                <p>所教班级：</p>
            </a-card>

        </a-flex>
    </a-flex>
</template>
<script setup>
import { useWebStore } from '@/stores/web.js';
const webStore = useWebStore()
import { reactive, ref } from 'vue';
const justify = ref('center');
const alignItems = ref('center');
const boxStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '6px',
    // border: '1px solid #40a9ff',
};
</script>

<style scoped>
.background{
    background-color: rgba(0, 0, 0, 0.1);
    height: 320px;
}
</style>