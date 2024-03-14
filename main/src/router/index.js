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
        component: () => import('@/views/student/index.vue')
        
    },
    
    {
        path: '/personal',
        component: () => import('@/views/personal/personal_info.vue')
    },
    {
        path: '/test',
        name: 'test',
        meta: { requiresAuth: true },
        component: () => import('@/views/test/test.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 使用全局前置守卫来检查用户是否已登录
router.beforeEach((to, from, next) => {
    // 检查即将进入的路由是否需要认证
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // 检查用户是否已登录
      if (!isLoggedIn()) {
        // 如果用户未登录，则重定向到登录页面
        next({
          path: '/login',
          // 将重定向的页面路径作为查询参数，登录后可以跳转回去
          query: { redirect: to.fullPath }
        });
      } else {
        // 如果已登录，则正常导航到目标页面
        next();
      }
    } else {
      // 如果不需要认证，则直接导航
      next();
    }
  });
  
  function isLoggedIn() {
    // 实现检查登录状态的逻辑
    // return localStorage.getItem('userLoggedIn') === 'true';
    return true;
  }


export default router