<template>

    <a-flex gap="middle" align="start" vertical class="container-center">
      <a-flex :style="{ ...boxStyle }" :justify="justify" :align="alignItems">
        <div class="loginbox">
          <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
            @finishFailed="onFinishFailed">
            <h1 class="title-center">注册</h1>
            <a-form-item label="账号" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
              <a-input v-model:value="formState.username">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
  
            <a-form-item label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
              <a-input-password v-model:value="formState.password">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
              
            </a-form-item>
            <a-form-item label="邮箱" name="emial" :rules="[{ required: true, message: 'Please input your email!' }]">
              <a-input v-model:value="formState.email">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item label="学号" name="stuNo" :rules="[{ required: true, message: 'Please input your stuNO!' }]">
              <a-input v-model:value="formState.stuNo">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item label="班级" name="classNo" :rules="[{ required: true, message: 'Please input your classNo!' }]">
              <a-input v-model:value="formState.classNo">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item label="姓名" name="name" :rules="[{ required: true, message: 'Please input your name!' }]">
              <a-input v-model:value="formState.name">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
  
            
            <a-form-item class="center">
              <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button" @click="login">
                立即注册
              </a-button>
              <!-- <a-button @click="success">Success</a-button> -->
            </a-form-item>
          </a-form>
        </div>
      </a-flex>
    </a-flex>
  
  </template>
  
  <script setup>
  import axios from 'axios';
  import { message } from 'ant-design-vue';
  import { useWebStore } from '@/stores/web.js';
  const webStore = useWebStore()
  
  import { reactive, computed, ref } from 'vue';
  const value = ref('1')
  const justify = ref('center');
  const alignItems = ref('center');
  const formState = reactive({
    username: '',
    password: '',
    remember: true,
  });
  const success = () => {
    message.success({
      content: '登录成功',
      duration: 1
    });
  };
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
  
  //请求
  const login = () => {
    axios.post('/api/test', formState)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error('error!', error)
      })
  
  }
  
  </script>
  
  
  
  
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
  .space-around{
  display: flex;
  justify-content: space-around;
  }
  
  /* 登录的居中 */
  .center{
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
  
  /* 登录按键字体的大小 */
  .login-form-button{
    font-size: 18px;
  }
  
  /* form表单里div的下边距 */
  .ant-form-item {
      margin-bottom: 10px;
  }
  
  </style>