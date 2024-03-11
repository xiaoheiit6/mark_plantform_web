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
        path: '/register',
        component: () => import('@/views/register/index.vue')
    },
    {
        path: '/teacher',
        component: () => import('@/views/teacher/index.vue'),
        children: [
            {
                path:'data',
                component: import('@/views/teacher/data.vue')
            },
            {
                path:'success',
                component: import('@/views/teacher/success.vue')
            }
        ]
    },
    {
        path: '/student',
        name: 'ooo',
        component: () => import('@/views/student/index.vue')
        
    },
    
    {
        path: '/personal',
        component: () => import('@/views/personal/personal_info.vue')
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test/test.vue')
    },
]

const router = createRouter({
    
    history: createWebHistory(),
    routes
})



export default router