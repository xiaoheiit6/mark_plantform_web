import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('@/views/index.vue')
    },
    {
        path: '/content',
        component: () => import('@/views/content.vue')
    },
    {
        path:'/login',
        component: () => import('@/views/login/index.vue')
    }
]

const router = createRouter({
    
    history: createWebHistory(),
    routes
})

export default router