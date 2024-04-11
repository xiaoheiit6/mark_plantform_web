<template>
  <a-card title="Send Prompt and Receive Data">
    <a-input
    v-model:value="value"
      placeholder="Enter your prompt here"
      style="margin-bottom: 10px;"
    ></a-input>
    <a-button type="primary" @click="sendPrompt">Send</a-button>
    <div style="height: 300px; overflow-y: auto; margin-top: 10px;">
      <p v-for="item in items" :key="item.id">{{ item.message }}</p>
    </div>
  </a-card>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([]);
const value = ref('');

const sendPrompt = () => {
  const url = `/api/student/eb_stream?prompt=${encodeURIComponent(value.value)}`;
  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    items.value.push({ id: Date.now(), message: data.result });
  };

  eventSource.onerror = (error) => {
    console.error('Error with SSE:', error);
    eventSource.close();
  };

  eventSource.onopen = () => {
    console.log('Connection to server opened.');
  };
}
</script>

<style>
.app {
  max-width: 600px;
  margin: 50px auto;
}
</style>
