<template>
  <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange" @drop="handleDrop">
    <p class="uploadbox">
      <UploadOutlined />
    </p>
    <p class="ant-upload-text">点击或者拖拽文件到此处上传</p>
    <p class="ant-upload-hint">
      只支持jpg等图片上传！
    </p>
  </a-upload-dragger>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { UploadOutlined, } from '@ant-design/icons-vue';
const fileList = ref([]);
const handleChange = info => {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
function handleDrop(e) {
  console.log(e);
}
</script>


<style scoped>
/* .uploadbox{
  transform: scale(2);
} */
</style>