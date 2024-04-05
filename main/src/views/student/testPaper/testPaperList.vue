<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          试卷
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag v-for="tag in record.tags" :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />


          <a class="ant-dropdown-link" @click="showModal(record)">
            上传
          </a>

        </span>
      </template>
    </template>
  </a-table>

  <!-- Modal 对话框 -->
  <a-modal title="上传文件" :visible="isModalVisible" @ok="handleOk" @cancel="handleCancel">

    <a-upload-dragger 
      v-model:fileList="fileList" 
      name="file"
      :data="uploadData" 
      :multiple="true"
      action="/api/student/stuUpload" 
      @change="handleChange" 
      @drop="handleDrop" >

      <p class="ant-upload-drag-icon">
        <FolderAddTwoTone />
      </p>
      <p class="ant-upload-text">点击或者拖拽文件到此处上传</p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </a-upload-dragger>

  </a-modal>

</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { message } from 'ant-design-vue';
import { FolderAddTwoTone } from '@ant-design/icons-vue';
import { useWebStore } from '@/stores/web.js';
const webStore = useWebStore()
const fileList = ref([]);
const isModalVisible = ref(false);
const selectedKey = ref('');

const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
];
const data = reactive([
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
])

// 修改 showModal 方法以接收当前行的数据
const showModal = (record) => {
  selectedKey.value = record.key; // 存储当前行的 key 值
  isModalVisible.value = true;
};

// 处理点击对话框OK按钮的方法
const handleOk = () => {
  console.log('点击了OK!', '选中的行的 key 是：', selectedKey.value);
  isModalVisible.value = false;
};

// 处理点击对话框取消按钮的方法
const handleCancel = () => {
  console.log('点击了取消');
  isModalVisible.value = false;
};

// 把 uploadData 改成计算属性
const uploadData = computed(() => ({
  username: webStore.info.userName,
  token: webStore.info.token,
  paperId: selectedKey.value,
}));

const handleChange = info => {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === 'error') {
    message.error(`${info.file.name} 上传失败!`);
  }
};
function handleDrop(e) {
  console.log(e);
}



</script>