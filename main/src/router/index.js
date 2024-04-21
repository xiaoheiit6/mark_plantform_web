import { createRouter, createWebHistory } from 'vue-router'
import { useWebStore } from '@/stores/web'
import App from '@/App.vue'
import { StudentChat, StudentData, StudentLayout, StudentTestPaperDetails, StudentTestPaperList } from '@/views/student'
import { TeacherAddTestPaper, TeacherChat, TeacherData, TeacherLayout, TeacherManageStudentList, TeacherTestPaperDetails, TeacherTestPaperDetailsSingal, TeacherTestPaperList } from '@/views/teacher'

const routes = [
  {
    path: '/',
    component: App,
    // meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录-文心智评' },
  },
  {
    path: '/register',
    component: () => import('@/views/register/index.vue'),
    meta: { title: '注册-文心智评' },
  },
  {
    path: '/teacher',
    component: TeacherLayout,
    meta: { requiresAuth: true, breadcrumb: '教师端', title: '教师-文心智评' },
    children: [

      {
        path: 'data',
        component: TeacherData,
        meta: { breadcrumb: '数据分析', title: '数据分析-文心智评' },
      },

      {
        path: 'studentList',
        component: TeacherManageStudentList,
        meta: { breadcrumb: '学生列表', title: '学生列表-文心智评' },
      },
      {
        path: 'testPaperList',
        component: TeacherTestPaperList,
        meta: { breadcrumb: '试卷列表', title: '试卷列表-文心智评' },
      },
      {
        path: 'addTestPaper',
        component: TeacherAddTestPaper,
        meta: { breadcrumb: '新建试卷', title: '新建试卷-文心智评' },

      },
      {
        path: 'testPaperDetails/:paperId',
        component: TeacherTestPaperDetails,
        meta: { breadcrumb: '试卷详情', title: '试卷详情-文心智评' },
      },
      {
        path: 'testPaperDetails/:paperId/:id/:username',
        component: TeacherTestPaperDetailsSingal,
        meta: { breadcrumb: '模型评阅详情', title: '评阅详情-文心智评' },
      },
      {
        path: 'chat',
        component: TeacherChat,
        meta: { breadcrumb: '智能助手', title: '智能助手-文心智评' },
      },

    ],
  },
  {
    path: '/student',
    component: StudentLayout,
    meta: { requiresAuth: true, breadcrumb: '学生端', title: '学生-文心智评' },
    children: [
      {
        path: 'data',
        component: StudentData,
        meta: { breadcrumb: '数据分析', title: '数据分析-文心智评' },
      },
      {
        path: 'chat',
        component: StudentChat,
        meta: { breadcrumb: '智能问答', title: '智能问答-文心智评' },
      },
      {
        path: 'testPaperList',
        component: StudentTestPaperList,
        meta: { breadcrumb: '试卷列表', title: '试卷列表-文心智评' },
      },
      {
        path: 'testPaperDetails/:paperId',
        component: StudentTestPaperDetails,
        meta: { breadcrumb: '试卷详情', title: '试卷详情-文心智评' },
      },
    ],
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 使用全局前置守卫来检查用户是否已登录
router.beforeEach((to, from, next) => {
  // 设置每个页面的title
  document.title = to.meta.title || '文心智评'

  if (to.path === '/student') {
    return next('/student/data') // 使用return确保不会继续执行后面的代码
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
        query: { redirect: to.fullPath },
      })
    } else {
      // 如果已登录，则正常导航到目标页面
      next()
    }
  } else {
    // 如果不需要认证，则直接导航
    next()
  }
})

function isLoggedIn() {
  // 实现检查登录状态的逻辑
  // return localStorage.getItem('userLoggedIn') === 'true';

  // 真·逻辑
  return useWebStore().info.isLogin
  // return true
}

export default router
