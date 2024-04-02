import { createRouter, createWebHistory } from "vue-router";
import { useWebStore } from "@/stores/web";

const routes = [
  {
    path: '/',
    component: () => import('@/App.vue')
  },
  {
    path: '/route',
    component: () => import('@/views/test/route.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/register',
    component: () => import('@/views/register/index.vue')
  },
  {
    path: '/teacher',
    component: () => import('@/views/teacher/index.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'info',
        component: import('@/views/teacher/info.vue')
      },
      {
        path: 'data',
        component: import('@/views/teacher/data.vue')
      },
      {
        path: 'success',
        component: import('@/views/teacher/success.vue')
      },
      {
        path: 'studentList',
        component: import('@/views/teacher/studentManage/studentList.vue')
      },
      {
        path: 'testPaperList',
        component: import('@/views/teacher/testPaper/testPaperList.vue')
      },
      {
        path: 'addTestPaper',
        component: import('@/views/teacher/testPaper/addTestPaper.vue')
      },
      {
        path: 'studentScoreData',
        component: import('@/views/teacher/studentManage/studentScoreData.vue')
      },
      {
        path: 'studentScoreAnalysis',
        component: import('@/views/teacher/studentManage/studentScoreAnalysis.vue')
      }
    ]
  },
  {
    path: '/student',
    component: () => import('@/views/student/index.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'info',
        component: import('@/views/student/info.vue')
      },
      {
        path: 'data',
        component: import('@/views/student/data.vue')
      },
      {
        path: 'upload',
        component: import('@/views/student/upload.vue')
      },
      {
        path: 'testPaperList',
        component: import('@/views/student/testPaper/testPaperList.vue')
      }
    ]
  },

  {
    path: '/test',
    name: 'test',
    meta: { requiresAuth: true },
    component: () => import('@/views/test/test.vue')
  },
  {
    path: '/echarts',
    component: () => import('@/views/test/echarts.vue')
  },
  {
    path: '/table',
    component: () => import('@/views/test/table.vue')
  },
  {
    path: '/img',
    component: () => import('@/views/test/img.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 使用全局前置守卫来检查用户是否已登录
router.beforeEach((to, from, next) => {
  //设置每个页面的title
  document.title = to.meta.title || '智能阅卷平台'

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
   //return localStorage.getItem('userLoggedIn') === 'true';
  
   //真·逻辑
  return useWebStore().info.isLogin
  //return true
 
}


export default router