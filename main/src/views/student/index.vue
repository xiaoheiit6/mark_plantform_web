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
                    <router-link to="/student/chat" />
                    <UserOutlined />
                    <span>智能问答</span>
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
                    <a-dropdown>
                        <template #overlay>
                            <a-menu @click="handleMenuClick">
                                <a-menu-item key="1">
                                    <router-link to="/student/info" />
                                    <UserOutlined />
                                    个人信息
                                </a-menu-item>
                                <a-menu-item @click="logout">
                                    <LogoutOutlined />
                                    退出
                                </a-menu-item>
                            </a-menu>
                        </template>
                        <a-avatar :size="small" src="/api/static/avatar/student.png">
                            <template #icon>
                                <UserOutlined />

                            </template>
                        </a-avatar>

                    </a-dropdown>
                    <span>{{ webStore.info.realName }}</span>
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
                这次一定队 ©2024 第十五届服创大赛
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script setup>
import { useWebStore } from '@/stores/web.js';
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { PieChartOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import axios from 'axios';
import { message } from 'ant-design-vue';
const route = useRouter()
const webStore = useWebStore()
const collapsed = ref(false);
const selectedKeys = ref(['1']);
const boxStyle = {
    width: '95%',
    height: '64px',
    borderRadius: '6px',
};

const logout = () => {
    const logoutData = reactive({
        username: webStore.info.userName,
        token: webStore.info.token
    })
    axios.post("/api/auth/stuLogout", logoutData)
        .then(response => {
            const code = response.data.code
            if (code === 200) {
                message.success({
                    content: '已经退出!'
                })
                webStore.info.id = -1;
                webStore.info.userName = ""
                webStore.info.token = ""
                webStore.info.isLogin = false

                route.push("/")
            }

        })
        .catch(error => {
            console.log(error)
        })


}
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
    height: 80px; /* 根据需要调整高度 */
    width: 80px; /* 宽度和高度保持一致以形成完美的圆形 */
    background-image: url('/api/static/avatar/student.png');
    background-size: cover; /* 或者使用 contain 根据您的需要 */
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%; /* 添加这一行来使图标变成圆形 */
    display: flex; /* 启用 flex 布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    margin: auto;
}
</style>
