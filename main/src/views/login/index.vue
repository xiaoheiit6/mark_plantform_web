<template>
  
    <a-flex gap="middle" align="start" vertical class="container-center">
      <a-flex :style="{ ...boxStyle }" :justify="justify" :align="alignItems">
        <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
          @finishFailed="onFinishFailed">
          <a-form-item label="账号" name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item label="密码" name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-form-item name="remember" no-style>
              <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
            </a-form-item>
            <a class="login-form-forgot" href="">忘记密码</a>
          </a-form-item>

          <a-form-item>
            <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
             登录
            </a-button>
            或者
            <a href="">现在注册!</a>
          </a-form-item>
        </a-form>
      </a-flex>
    </a-flex>
  
</template>

<script setup>
import { useWebStore } from '@/stores/web.js';
const webStore = useWebStore()

import { reactive, computed, ref } from 'vue';

const justify = ref('center');
const alignItems = ref('center');
const formState = reactive({
  username: '',
  password: '',
  remember: true,
});
const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
const boxStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '6px',

};
</script>




<style scoped>
.container-center {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  height: 100vh;
  /* 使容器的高度等于视口的高度 */

  background-image: url('@/assets/background.jpg'); /* 设置背景图片 */
  background-size: cover; /* 背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中显示 */
}

.login-form {
  max-width: 360px;
  /* 可以设置一个最大宽度 */
  width: 100%;
  /* 确保它不会超过其容器的宽度 */
}

</style>