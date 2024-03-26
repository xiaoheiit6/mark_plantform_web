<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item key="1">
                    <router-link to="/student/data" />
                    <PieChartOutlined />
                    <span>分析</span>
                </a-menu-item>

                <a-menu-item key="2">
                    <router-link to="/student/upload" />
                    <UserOutlined />
                    <span>上传页面</span>
                </a-menu-item>

                <a-sub-menu key="sub1">
                    <template #title>
                        <span>
                            <user-outlined />
                            <span>考试</span>
                        </span>
                    </template>
                    <a-menu-item key="3">
                        <span>考试列表</span>
                        <router-link to="/student/testPaperList" />
                    </a-menu-item>
                    <a-menu-item key="4">null</a-menu-item>
                    <a-menu-item key="5">null</a-menu-item>
                </a-sub-menu>
                <a-menu-item key="6">
                    <router-link to="/student/data" />
                    <PieChartOutlined />
                    <span>个人信息</span>
                </a-menu-item>

                
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-flex :style="{ ...boxStyle }" justify="flex-end" align="center" gap="large">
                    
                    <a-button type="primary">Primary Button</a-button>

                    <a-dropdown>
                        <template #overlay>
                            <a-menu @click="handleMenuClick">
                                <a-menu-item key="1">
                                    <UserOutlined />
                                    Your profile
                                </a-menu-item>
                                <a-menu-item key="2">
                                    <LogoutOutlined />
                                    Sign out
                                </a-menu-item>
                            </a-menu>
                        </template>
                        <a-avatar :size="small">
                            <template #icon>
                                <UserOutlined />

                            </template>
                        </a-avatar>

                    </a-dropdown>
                    <span>{{ webStore.info.userName }}</span>
                </a-flex>
            </a-layout-header>
            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb style="margin: 16px 0">

                </a-breadcrumb>
                <div :style="{ padding: '24px', background: '#fff', minHeight: '100%' }">
                    <router-view />
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script setup>
import { useWebStore } from '@/stores/web.js';
const webStore = useWebStore()
import { ref } from 'vue';
import { PieChartOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons-vue';
const collapsed = ref(false);
const selectedKeys = ref(['1']);
const boxStyle = {
    width: '95%',
    height: '64px',
    borderRadius: '6px',
    
};
</script>


<style scoped>
#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}

.logo {
    height: 50px;
    width: 100%;

}
</style>
