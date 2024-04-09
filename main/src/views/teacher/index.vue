<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo" />
            <!-- <span style="background-color: #fff; display: flex; ">教师批阅系统</span> -->
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item key="1">
                    <router-link to="/teacher/data" />
                    <PieChartOutlined />
                    <span>历史数据</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <router-link to="/teacher/success" />
                    <CommentOutlined />
                    <span>成功页面</span>
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <template #title>
                        <span>
                            <user-outlined />
                            <span>试卷</span>
                        </span>
                    </template>
                    <a-menu-item key="3">
                        <span>新试卷设计</span>
                        <router-link to="/teacher/addTestPaper" />
                    </a-menu-item>
                    <a-menu-item key="4">
                        <span>试卷管理</span>
                        <router-link to="/teacher/testPaperList" />
                    </a-menu-item>
                    <a-menu-item key="5">
                        <span>试卷批阅</span>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub2">
                    <template #title>
                        <span>
                            <TeamOutlined />
                            <span>学生</span>
                        </span>
                    </template>
                    <a-menu-item key="6">
                        <span>学生管理</span>
                        <router-link to="/teacher/studentList" />
                    </a-menu-item>
                    <a-menu-item key="7">
                        <span>成绩统计</span>
                        <router-link to="/teacher/studentScoreData" />
                    </a-menu-item>
                    <a-menu-item key="8">
                        <span>成绩分析</span>
                        <router-link to="/teacher/studentScoreAnalysis" />
                    </a-menu-item>
                </a-sub-menu>

            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-flex :style="{ ...boxStyle }" justify="flex-end" align="center" gap="large">
                    <a-dropdown>
                        <template #overlay>
                            <a-menu @click="handleMenuClick">
                                <a-menu-item key="1">
                                    <UserOutlined />
                                    <router-link to="/teacher/info" />
                                    个人信息
                                </a-menu-item>
                                <a-menu-item key="2" @click="logout">
                                    <LogoutOutlined />
                                    退出
                                </a-menu-item>
                            </a-menu>
                        </template>
                        <a-avatar src="/api/static/avatar/teacher.png">
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
                    <a-breadcrumb-item v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                        <router-link :to="breadcrumb.path">{{ breadcrumb.text }}</router-link>
                    </a-breadcrumb-item>
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
import { reactive, ref, computed } from 'vue';
import { PieChartOutlined, TeamOutlined, CommentOutlined, UserOutlined, CloudUploadOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { useWebStore } from '@/stores/web.js';
import axios from 'axios';
import { message } from 'ant-design-vue';
import { useRouter,useRoute } from 'vue-router';
const route = useRouter()
const router = useRoute()
const webStore = useWebStore()
const collapsed = ref(false);
const selectedKeys = ref(['1']);

const breadcrumbs = computed(() => {
  let matched = router.matched.filter(item => item.meta && item.meta.breadcrumb);
  return matched.map(item => {
    return {
      text: item.meta.breadcrumb,
      path: item.path
    };
  });
});

const logout = () => {
    const logoutData = reactive({
        username: webStore.info.userName,
        token: webStore.info.token
    })
    axios.post("/api/auth/teacherLogout", logoutData)
        .then(response => {
            const code = response.data.code
            if (code === 200) {
                message.success({
                    content: "已经退出!"
                })
                webStore.info.id = -1;
                webStore.info.userName = ""
                webStore.info.token = ""
                webStore.info.isLogin = false

                route.push("/")
            }
        })
        .catch(error =>{
            console.log(error)
        })
}

const boxStyle = {
    width: '95%',
    height: '64px',
    borderRadius: '6px',
    // border: '1px solid #40a9ff',
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
    height: 80px; /* 根据需要调整高度 */
    width: 80px; /* 宽度和高度保持一致以形成完美的圆形 */
    background-image: url('/api/static/avatar/teacher.png');
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
