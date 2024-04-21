<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { FieldNumberOutlined, FileOutlined, TagOutlined, ToolOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useWebStore } from '@/stores/web.js'
import { http } from '@/lib/Http.js'

use([GridComponent, BarChart, CanvasRenderer])

const router = useRouter()
// 使用WebStore
const webStore = useWebStore()
const selectedKey = ref('')
const open = ref(false)
const chartDataX1 = ref([])
const chartDataY1 = ref([])

// 表格列的定义
const columns = reactive([
  {
    title: '试卷ID',
    dataIndex: 'paperId',
    key: 'paperId',
  },
  {
    title: '试卷名',
    dataIndex: 'paperName',
    key: 'paperName',
  },

  {
    title: '试卷描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '操作',
    key: 'action',
    // 根据需要定义操作列的内容
  },
])

// 试卷数据，初始为空数组
const data = ref([])

function viewDetails(record) {
  // 使用编程式导航跳转到详情页，并传递 paperId 参数
  router.push({ path: `/teacher/testPaperDetails/${record.paperId}` })
}

// 从后端获取试卷数据
async function fetchPapers() {
  try {
    const response = await http.post('/teacher/getAllPaper', {
      username: webStore.info.userName,
      token: webStore.info.token,
    })
    data.value = response.data.map(item => ({
      key: item.paperId.toString(),
      ...item,
    }))
  } catch (error) {
    message.error('请求试卷数据失败')
    console.error(error)
  }
}

function exportGrade(record) {
  const exportInfo = reactive({
    username: webStore.info.userName,
    token: webStore.info.token,
    paperId: record.paperId.toString(),
  })

  http.post('/teacher/exportGrade', exportInfo, { responseType: 'blob' })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      // 假设服务器返回的文件名在response.headers['content-disposition']中
      // 如果不是这样，请替换为正确的方式获取文件名
      const contentDisposition = response.headers['content-disposition']
      let fileName = 'downloaded_file'
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/)
        if (fileNameMatch.length === 2)
          fileName = fileNameMatch[1]
      }
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    })
    .catch((error) => {
      console.error('导出文件时发生错误:', error)
    })
}

// 组件挂载时请求数据
onMounted(fetchPapers)

// 处理查看成绩的逻辑
function showGarde(record) {
  selectedKey.value = record.key

  http.post('/teacher/average', {
    username: webStore.info.userName,
    token: webStore.info.token,
    paperId: selectedKey.value,
  }).then((response) => {
    const responseData = response.data
    chartDataX1.value = Object.keys(responseData.distribution) // 提取 x 轴数据
    chartDataY1.value = Object.values(responseData.distribution) // 提取柱状图数据
  }).catch((error) => {
    console.error('获取成绩数据时发生错误:', error)
  })

  open.value = true
}

const option = computed(() => {
  return {
    xAxis: {
      type: 'category',
      data: chartDataX1.value,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: chartDataY1.value,
        type: 'bar',
      },
    ],
  }
})

function handleOkGarde() {
  open.value = false
}

function handleCancelGarde() {
  open.value = false
}

// 发送删除请求
async function deletePaper(paperId) {
  try {
    // 发送删除请求
    const response = await http.post('/teacher/deletePaper', {
      username: webStore.info.userName,
      token: webStore.info.token,
      paperId,
    })

    // 根据实际情况处理响应，下面是一个基本示例
    if (response.data.code === 200) {
      // 从data中移除已删除的试卷
      data.value = data.value.filter(item => item.paperId.toString() !== paperId)
      message.success('试卷删除成功')
    } else {
      // 处理错误情况（例如显示错误消息）
      message.error('试卷删除失败')
    }
  } catch (error) {
    // 捕获并处理请求错误
    console.error('删除试卷时发生错误：', error)
    message.error('删除试卷时发生错误')
  }
}

// 点击确定删除时函数
function confirmDelete(record) {
  deletePaper(record.paperId.toString())
}
</script>

<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'paperId'">
        <span>
          <FieldNumberOutlined />
          试卷ID
        </span>
      </template>

      <template v-if="column.key === 'paperName'">
        <span>
          <FileOutlined />
          试卷
        </span>
      </template>
      <template v-if="column.key === 'description'">
        <span>
          <TagOutlined />
          试卷描述
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
      <template v-if="column.key === 'paperName'">
        <span>

          {{ record.paperName }}
        </span>
      </template>
      <template v-else-if="column.key === 'description'">
        <span>

          {{ record.description }}
        </span>
      </template>
      <!-- 根据实际情况调整或添加其他列的模板 -->
      <template v-else-if="column.key === 'action'">
        <span>
          <!-- <a>模型结果</a>
                    <a-divider type="vertical" /> -->
          <a @click="viewDetails(record)">查看详情</a>
          <a-divider type="vertical" />
          <a @click="showGarde(record)">查看成绩分布</a>
          <a-divider type="vertical" />
          <a @click="exportGrade(record)">导出数据</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确定要删除?" ok-text="是" cancel-text="否" @confirm="() => confirmDelete(record)"
            @cancel="cancel"
          >
            <a>删除</a>
          </a-popconfirm>
        </span>
      </template>
    </template>
  </a-table>

  <!-- 成绩对话框 -->
  <a-modal :open="open" title="成绩分布" @ok="handleOkGarde" @cancel="handleCancelGarde">
    <VChart class="chart" :option="option" />
  </a-modal>
</template>

<style scoped>
.chart {
    height: 350px;
    width: 500px;
}
</style>
