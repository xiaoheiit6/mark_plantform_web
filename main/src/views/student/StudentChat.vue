<template>
  
  <a-card title="智能问答助手">
    <div v-if="loading" style="height:300px; display: flex; justify-content: center; align-items: center;">
      <a-spin tip="AI思考中..."></a-spin>
    </div>
    <div v-else style="height: 300px; overflow-y: auto; margin-top: 10px;">
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
import {http} from '@/lib/Http.js';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();
const inputValue = ref('');
const lastMessage = ref(md.render(`
## 欢迎使用**智能问答助手**


**智能问答助手**是您的个人学习伙伴，随时准备回答您的任何问题。无论是学术研究、日常生活知识还是深入探讨，我都在这里帮助您。

### 特点

- **即时回复**：快速响应，即时获取答案。
- **多领域知识**：涵盖科学、文学、艺术等多个领域。
- **个性化学习**：根据您的学习习惯和偏好进行个性化调整。

### 如何使用？

只需在下方输入您的问题，智能问答助手将为您提供详尽的解答。

`));
const loading = ref(false);

const submitRequest = async () => {
  if (!inputValue.value.trim()) return;
  loading.value = true;
  try {
    const response = await http.post('/student/eb_stream', {
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
