<template>
  <div class="chat-window">
    <a-card title="实时聊天室" class="chat-card">
      <div class="messages" ref="messageContainer">
        <div v-for="(message, index) in messages" :key="index" class="message" :class="{ 'my-message': message.sender === '我' }">
          <div class="sender">{{ message.sender }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
      <a-input
        v-model="input"
        placeholder="输入消息..."
        size="large"
        @keyup.enter="send"
      />
      <a-button type="primary" @click="send">发送</a-button>
    </a-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      messages: [],
      input: ''
    };
  },
  methods: {
    async send() {
      const content = this.input.trim();
      if (content) {
        const response = await axios.post('/api/send-message', { content });
        this.messages.push({
          sender: '我',
          content: content
        });
        // 假设服务器会返回所有最新消息
        this.messages = response.data.messages;
        this.input = '';
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      container.scrollTop = container.scrollHeight;
    }
  }
};
</script>

<style>
.chat-window {
  max-width: 600px;
  margin: 50px auto;
}
.chat-card {
  height: 400px;
  overflow: auto;
}
.messages {
  margin-bottom: 16px;
}
.message {
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
}
.my-message {
  text-align: right;
}
.sender {
  font-weight: bold;
}
.content {
  margin-top: 5px;
}
</style>
