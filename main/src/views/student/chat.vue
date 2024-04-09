<template>
    <a-layout class="chat-layout">
      <a-layout-header>
        <div class="header-inner">ChatGPT 模仿对话系统</div>
      </a-layout-header>
      <a-layout-content>
        <div class="messages">
          <div v-for="(message, index) in messages" :key="index" class="message" :class="{ user: message.sender === 'user', bot: message.sender === 'bot' }">
            <a-tooltip :placement="message.sender === 'user' ? 'left' : 'right'" :title="message.content">
              <div class="message-content">{{ message.content }}</div>
            </a-tooltip>
          </div>
        </div>
      </a-layout-content>
      <a-layout-footer>
        <a-input v-model="userInput" placeholder="输入你的问题" @keyup.enter="sendMessage" />
        <a-button type="primary" @click="sendMessage">发送</a-button>
      </a-layout-footer>
    </a-layout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const messages = ref([]);
  const userInput = ref('');
  
  const sendMessage = async () => {
    const input = userInput.value.trim();
    if (!input) return;
    const userMessage = { sender: 'user', content: input };
    messages.value.push(userMessage);
    userInput.value = ''; // 清空输入框
    try {
      const response = await axios.post('/your/api/endpoint', { message: input });
      messages.value.push({ sender: 'bot', content: response.data.reply });
    } catch (error) {
      console.error('Error:', error);
      messages.value.push({ sender: 'bot', content: '抱歉，无法获取回复。' });
    }
  };
  </script>
  
  <style scoped>
  .chat-layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .header-inner {
    color: #fff;
    font-size: 20px;
  }
  
  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: #f0f2f5;
    display: flex;
    flex-direction: column-reverse;
  }
  
  .message {
    display: flex;
    margin-bottom: 10px;
  }
  
  .message.user {
    justify-content: flex-end;
  }
  
  .message-content {
    padding: 10px 15px;
    border-radius: 20px;
    max-width: 60%;
  }
  
  .message.user .message-content {
    background-color: #e6f7ff;
  }
  
  .message.bot .message-content {
    background-color: #fff;
  }
  
  a-layout-footer {
    display: flex;
    align-items: center;
  }
  
  a-input {
    flex: 1;
    margin-right: 8px;
  }
  </style>
  