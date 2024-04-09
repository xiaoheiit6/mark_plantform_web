import { createRouter, createWebHistory } from "vue-router";
import { useWebStore } from "@/stores/web";

const routes = [
  {
    path: '/',
    component: () => import('@/App.vue'),
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true, breadcrumb: '教师端' },
    children: [
      {
        path: 'info',
        component: import('@/views/teacher/info.vue')
      },
      {
        path: 'data',
        component: import('@/views/teacher/data.vue'),
        meta: {breadcrumb: '数据分析'}
      },
      {
        path: 'success',
        component: import('@/views/teacher/success.vue'),
        meta: {breadcrumb: '成功页面'}
      },
      {
        path: 'studentList',
        component: import('@/views/teacher/studentManage/studentList.vue'),
        meta: {breadcrumb: '学生列表'}
      },
      {
        path: 'testPaperList',
        component: import('@/views/teacher/testPaper/testPaperList.vue'),
        meta: {breadcrumb: '试卷列表'}
      },
      {
        path: 'addTestPaper',
        component: import('@/views/teacher/testPaper/addTestPaper.vue'),
        meta: {breadcrumb: '新建试卷'}

      },
      {
        path: "testPaperDetails/:paperId",
        component: import('@/views/teacher/testPaper/testPaperDetails.vue'),
        meta: {breadcrumb: '试卷详情'}
      },
      {
        path: 'studentScoreData',
        component: import('@/views/teacher/studentManage/studentScoreData.vue'),
        meta: {breadcrumb: '成绩统计'}
      },
      {
        path: 'studentScoreAnalysis',
        component: import('@/views/teacher/studentManage/studentScoreAnalysis.vue'),
        meta: {breadcrumb: '成绩分析'}
      }
    ]
  },
  {
    path: '/student',
    component: () => import('@/views/student/index.vue'),
    meta: { requiresAuth: true, breadcrumb: '学生端' },
    children: [
      {
        path: 'info',
        component: import('@/views/student/info.vue')
        
      },
      {
        path: 'data',
        component: import('@/views/student/data.vue'),
        meta: {breadcrumb: '数据分析'}
      },
      {
        path: 'chat',
        component: import('@/views/student/chat.vue'),
        meta: {breadcrumb: '智能问答'}
      },
      {
        path: 'testPaperList',
        component: import('@/views/student/testPaper/testPaperList.vue'),
        meta: {breadcrumb: '试卷列表'}
      },
      {
        path: 'testPaperDetails/:paperId',
        component: import('@/views/student/testPaper/testPaperDetails.vue'),
        meta: {breadcrumb: '试卷详情'}
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

  if (to.path === '/student') {
    return next('/student/data'); // 使用return确保不会继续执行后面的代码
  }

  if (to.path === '/teacher') {
    return next('/teacher/data')
  }

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