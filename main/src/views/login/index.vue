<script setup>
import { message } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWebStore } from '@/stores/web.js'

import { http } from '@/lib/Http.js'


const webStore = useWebStore()
const route = useRouter()
const value = ref('1')
const justify = ref('center')
const alignItems = ref('center')
const formState = reactive({
  username: '',
  password: '',
})

// 请求
async function login() {
  try {
    if (value.value === '1') {
      http.post('/auth/stuLogin', formState)
        .then((response) => {
          const code = response.data.code
          if (code === 200) {
            message.success({
              content: '登录成功',
              duration: 1,
            })
            const { token, username, name } = response.data.data

            webStore.info.id = 0
            webStore.info.userName = username
            webStore.info.realName = name
            webStore.info.token = token
            webStore.info.isLogin = true
            console.log(webStore.info)

            route.push('/student')
          }
        })
        .catch((error) => {
          console.log('error', error)
          message.error({
            content: '登录失败,请检查账号密码是否正确!',
            duration: 1,
          })
        })
    } else {
      http.post('/auth/teacherLogin', formState)
        .then((response) => {
          const code = response.data.code
          if (code === 200) {
            message.success({
              content: '登录成功',
              duration: 1,
            })
            const { token, username, name } = response.data.data

            webStore.info.id = 1
            webStore.info.userName = username
            webStore.info.realName = name
            webStore.info.token = token
            webStore.info.isLogin = true

            console.log(webStore.info)
            route.push('/teacher')
          }
        })
        .catch((error) => {
          console.log('error', error)
          message.error({
            content: '登录失败,请检查账号密码是否正确!',
            duration: 1,
          })
        })
    }
  } catch (error) {
    message.error({
      content: '服务器错误!',
      duration: 1,
    })
  }
}

function onFinish(values) {
  console.log('Success:', values)
}
function onFinishFailed(errorInfo) {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.username && formState.password)
})
const boxStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '6px',

}
</script>

<template>
  <a-flex gap="middle" align="start" vertical class="container-center">
    <a-flex :style="{ ...boxStyle }" :justify="justify" :align="alignItems">
      <div class="loginbox">
        <a-form
          :model="formState" name="normal_login" class="login-form" @finish="onFinish"
          @finish-failed="onFinishFailed"
        >
          <h1 class="title-center">
            文心智评
          </h1>
          <a-form-item label="账号" name="username" :rules="[{ required: true, message: '请输入你的用户名!' }]">
            <a-input v-model:value="formState.username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入你的密码!' }]">
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-radio-group v-model:value="value" name="radioGroup" class="space-around">
            <a-radio value="1">
              学生
            </a-radio>
            <a-radio value="2">
              老师
            </a-radio>
          </a-radio-group>
          <a-form-item class="center">
            <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button" @click="login">
              登录
            </a-button>
            或者
            <a href="/register">现在注册!</a>
          </a-form-item>
        </a-form>
      </div>
    </a-flex>
  </a-flex>
</template>

<style scoped>
.title-center {
  text-align: center;
}

.container-center {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  height: 100vh;
  /* 使容器的高度等于视口的高度 */
  background-image: url('@/assets/1.jpg');
  /* 设置背景图片 */
  background-size: cover;
  /* 背景图片覆盖整个容器 */
  background-position: center;
  /* 背景图片居中显示 */

}

.login-form {
  max-width: 360px;
  /* 可以设置一个最大宽度 */
  width: 100%;
  /* 确保它不会超过其容器的宽度 */

}

.loginbox {
  background-color: rgba(255, 255, 255, 0.5);
  /* 添加半透明的白色背景 */
  backdrop-filter: blur(10px);
  /* 对背景应用模糊效果 */
  -webkit-backdrop-filter: blur(10px);
  /* Safari 浏览器的兼容性 */
  border-radius: 6px;
  /* 如果需要，可以添加边框圆角 */
  padding: 3%;
  /* 根据需要调整内边距  */
}

/* 如果需要，也可以添加一个轻微的阴影效果来增强层次感 */
.loginbox {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* button的水平居中 */
.space-around {
  display: flex;
  justify-content: space-around;
}

/* 登录的居中 */
.center {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

/* form表单里div的下边距 */
.ant-form-item {
  margin-bottom: 10px;
}
</style>
