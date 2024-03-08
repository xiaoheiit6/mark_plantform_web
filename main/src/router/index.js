import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('@/App.vue')
    },
    {
        path:'/login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/teacher',
        component: () => import('@/views/teacher/index.vue')
    },
    {
        path: '/student',
        name: 'ooo',
        component: () => import('@/views/student/index.vue')
        
    }
]

const router = createRouter({
    
    history: createWebHistory(),
    routes
})



export default router