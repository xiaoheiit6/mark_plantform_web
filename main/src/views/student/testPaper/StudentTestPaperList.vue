<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { BulbOutlined, FolderAddTwoTone, FundProjectionScreenOutlined, SmileOutlined, ToTopOutlined, ToolOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useWebStore } from '@/stores/web.js'
import { http } from '@/lib/Http.js'

const router = useRouter()

const webStore = useWebStore()
const isModalVisible = ref(false)
const selectedKey = ref('')
const fileList = ref([])

// 表格列配置
const columns = [
  {
    title: '试卷名称',
    dataIndex: 'paperName',
    key: 'name',
  },

  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '分数',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '状态',
    key: 'submission',
  },
  {
    title: '操作',
    key: 'action',
  },
]

// 试卷数据
const data = reactive([])

function viewDetails(record) {
  // 使用编程式导航跳转到详情页，并传递 paperId 参数
  router.push({ path: `/student/testPaperDetails/${record.paperId}` })
}

// 获取试卷数据
onMounted(() => {
  fetchData()
})

async function fetchData() {
  try {
    const response = await http.post('/student/stuGetAllPaper', {
      username: webStore.info.userName,
      token: webStore.info.token,

    })
    data.splice(0, data.length, ...response.data) // 清空data并添加新数据
  } catch (error) {
    message.error('获取试卷数据失败')
    console.error(error)
  }
}

// 显示上传模态框
function showModal(record) {
  selectedKey.value = record.paperId
  isModalVisible.value = true
}

// 点击OK
function handleOk() {
  http.post('/student/marking', {
    username: webStore.info.userName,
    paperId: selectedKey.value.toString(),
  })
  isModalVisible.value = false
  router.go(0)
}

// 点击取消
function handleCancel() {
  isModalVisible.value = false
}

// 上传数据
const uploadData = computed(() => ({
  username: webStore.info.userName,
  token: webStore.info.token,
  paperId: selectedKey.value,
}))

function handleChange(info) {
  if (info.file.status === 'done') {
    message.success(`${info.file.name} 上传成功`)
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 上传失败`)
  }
}

function handleDrop(e) {
  console.log('Dropped files', e.dataTransfer.files)
}
</script>

<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <SmileOutlined />
          试卷
        </span>
      </template>
      <template v-if="column.key === 'description'">
        <span>
          <BulbOutlined />
          试卷描述
        </span>
      </template>
      <template v-if="column.key === 'score'">
        <span>
          <FundProjectionScreenOutlined />
          分数
        </span>
      </template>
      <template v-if="column.key === 'submission'">
        <span>
          <ToTopOutlined />
          上传状态
        </span>
      </template>
      <template v-if="column.key === 'action'">
        <span>
          <ToolOutlined />
          操作
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <span>{{ record.paperName }}</span>
      </template>
      <template v-else-if="column.key === 'description'">
        <span>{{ record.description }}</span>
      </template>
      <template v-else-if="column.key === 'score'">
        <span>
          <span v-if="record.score !== -1">{{ record.score }}</span>
          <a-tag v-else-if="record.score === -1" color="red">未评阅</a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'submission'">
        <span>
          <a-tag v-if="record.submission === 0" color="red">未上传</a-tag>
          <a-tag v-else-if="record.submission === 1" color="green">已上传</a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a @click="viewDetails(record)">查看详情</a>

          <a-divider type="vertical" />
          <a @click="showModal(record)">上传</a>
        </span>
      </template>
    </template>
  </a-table>

  <!-- Modal 对话框 -->
  <a-modal title="上传文件" :visible="isModalVisible" @ok="handleOk" @cancel="handleCancel">
    <a-upload-dragger
      v-model:fileList="fileList" name="file" :data="uploadData" :multiple="true"
      action="/student/stuUpload" @change="handleChange" @drop="handleDrop"
    >
      <p class="ant-upload-drag-icon">
        <FolderAddTwoTone />
      </p>
      <p class="ant-upload-text">
        点击或者拖拽文件到此处上传
      </p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
      </p>
    </a-upload-dragger>
  </a-modal>
</template>

<style scoped>
/* 这里可以添加一些CSS样式，如果需要的话 */
</style>
