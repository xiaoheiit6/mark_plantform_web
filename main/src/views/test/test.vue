<template>
  <a-flex gap="middle" align="start" vertical>
    <p>Select justify :</p>
    <a-segmented v-model:value="justify" :options="justifyOptions" />
    <p>Select align :</p>
    <a-segmented v-model:value="alignItems" :options="alignOptions" />
    <a-flex :style="{ ...boxStyle }" :justify="justify" :align="alignItems">
      <a-button type="primary">Primary</a-button>
      <a-button type="primary">Primary</a-button>
      <a-button type="primary">Primary</a-button>
      <a-button type="primary">Primary</a-button>
    </a-flex>
  </a-flex>


  <a-popover placement="bottom">
    <template #content>
      <a-button type="primary">退出</a-button>
      <p>Content</p>
    </template>
    <a-avatar :size="64">
      <template #icon>
        <UserOutlined />
      </template>
    </a-avatar>
  </a-popover>

</template>
<script setup>
import { useWebStore } from '@/stores/web.js';
const webStore = useWebStore()
import { reactive, ref } from 'vue';
const justifyOptions = reactive([
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
]);
const alignOptions = reactive(['flex-start', 'center', 'flex-end']);
const justify = ref(justifyOptions[0]);
const alignItems = ref(alignOptions[0]);
const boxStyle = {
  width: '100%',
  height: '120px',
  borderRadius: '6px',
  border: '1px solid #40a9ff',
};
</script>