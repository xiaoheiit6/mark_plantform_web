<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { http } from '@/lib/Http.js'
import { useWebStore } from '@/stores/web.js'
import router from '@/router'

const data = ref([])
const webStore = useWebStore()
const route = useRoute()

const selectedRecord = ref(null)
const modifyOpen = ref(false)
const confirmLoading = ref(false)
const teacherComment = ref('')
const teacherGrade = ref('')

const columns = [
  {
    title: '题号',
    dataIndex: 'questionId',
    key: 'questionId',
    width: '6%',
  },
  {
    title: '题目图片',
    dataIndex: 'image_paths',
    key: 'image_paths',
  },
  {
    title: '模型分数',
    dataIndex: 'score',
    key: 'score',
    width: '10%',
  },
  {
    title: '模型评语',
    dataIndex: 'parse',
    key: 'parse',
  },
  {
    title: '操作',
    key: 'action',
    width: '12%',
  },
]

onMounted(async () => {
  try {
    // 示例API请求，请替换为实际的API URL
    const response = await http.post('/teacher/getStuQuestionScore', {
      username: webStore.info.userName,
      token: webStore.info.token,
      stuUsername: route.params.username,
      paperId: route.params.paperId,
    })
    // 假设responseData就是响应数据
    const responseData = response.data

    const processedData = Object.keys(responseData.image_paths).map((key, index) => ({
      questionId: index,
      image_paths: [`/${responseData.image_paths[key]}`],
      score: responseData.questionScore.find(q => q.question === index)?.score || '',
      parse: responseData.questionScore.find(q => q.question === index)?.parse || '',
    }))

    data.value = processedData
  } catch (error) {
    console.error('Fetching data error:', error)
  }
})

function modify(record) {
  teacherComment.value = ''
  teacherGrade.value = ''
  selectedRecord.value = record // 保存当前记录
  console.log(record)
  modifyOpen.value = true
}

function handleModifyConfirm() {
  const requestData = {
    username: webStore.info.userName,
    token: webStore.info.token,
    teacherComment: teacherComment.value,
    teacherGrade: teacherGrade.value,
    paperId: route.params.paperId,
    stuUsername: route.params.username,
    question: selectedRecord.value.questionId.toString(),
  }

  confirmLoading.value = true

  http.post('/teacher/setStuQuestionScore', requestData)
    .then((response) => {
      if (response.data.code === 200) {
        // 处理响应
        message.success('修改成功!')
        router.go(0)
        sendEmailOpen.value = false // 这里确保关闭对话框
      }
    })
    .catch(() => {
      // 处理错误

      modifyOpen.value = false
    })
    .finally(() => {
      confirmLoading.value = false // 停止加载动画
    })
}
</script>

<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <span v-if="column.key === 'questionId'">题号</span>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'questionId'">
        <span>{{ record.questionId }}</span>
      </template>
      <template v-else-if="column.key === 'image_paths'">
        <a-image v-for="(imgPath, index) in record.image_paths" :key="index" :src="imgPath" :width="100" />
      </template>
      <template v-else-if="column.key === 'score'">
        {{ record.score }}
      </template>
      <template v-else-if="column.key === 'parse'">
        {{ record.parse }}
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a @click="modify(record)">修改分数和评语</a>
        </span>
      </template>
    </template>
  </a-table>
  <a-back-top />
  <!-- 修改分数和评语对话框 -->
  <a-modal v-model:open="modifyOpen" title="修改分数和评语" :confirm-loading="confirmLoading" @ok="handleModifyConfirm">
    <div style="display: flex; flex-direction: row;">
      <a-textarea v-model:value="teacherComment" placeholder="请输入评语" auto-size style="flex: 1;" />
      <a-textarea v-model:value="teacherGrade" placeholder="请输入分数" auto-size style="width: 100px;" />
    </div>
  </a-modal>
</template>
