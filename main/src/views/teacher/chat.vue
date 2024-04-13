<template>
  
    <a-card title="智能助手">
      <div v-if="loading" style="height:360px; display: flex; justify-content: center; align-items: center;">
        <a-spin tip="AI思考中..."></a-spin>
      </div>
      <div v-else style="height: 360px; overflow-y: auto; margin-top: 1px;">
        <div class="message-background" v-html="lastMessage"></div> <!-- 使用 v-html 渲染 HTML -->
      </div>
      <a-input-group compact>
        <a-input v-model:value="inputValue" placeholder="请输入你的问题" style="width: calc(100% - 100px)" />
        <a-button type="primary" @click="submitRequest">提交</a-button>
      </a-input-group>
    </a-card>
  
  </template>
  
  
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import MarkdownIt from 'markdown-it';
  
  const md = new MarkdownIt();
  const inputValue = ref('');
  const lastMessage = ref(md.render(`
  # 智能问答助手

欢迎使用我们设计的智能问答助手，专为老师定制。

## 功能特点

- **智能回答**: 给出准确、清晰的答案。
- **多语言支持**: 满足不同老师的需求。
- **自定义知识库**: 定制化课程内容。
- **即时更新**: 持续优化，提供最新答案。

## 如何使用

1. **提问**: 输入问题。
2. **获取答案**: 等待几秒钟。
3. **反馈和改进**: 提出建议。
  
  `));
  const loading = ref(false);
  
  const submitRequest = async () => {
    if (!inputValue.value.trim()) return;
    loading.value = true;
    try {
      const response = await axios.post('/api/teacher/eb_stream', {
        prompt: inputValue.value
      });
      if (response.data && response.data.result) {
        lastMessage.value = md.render(response.data.result); // 解析 Markdown 到 HTML
      }
    } catch (error) {
      console.error('Request failed:', error);
      lastMessage.value = '请求失败';
    }
    inputValue.value = '';
    loading.value = false;
  };
  </script>
  
  
  
  <style scoped>
  .message-background {
    background-color: #f0f0f0; /* 灰色背景 */
    padding: 10px;
    border-radius: 5px; /* 轻微的圆角效果 */
  }
  
  
  </style>
  