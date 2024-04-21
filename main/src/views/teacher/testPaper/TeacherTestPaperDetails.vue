<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BarChartOutlined, FieldNumberOutlined, FieldStringOutlined, PictureOutlined, ToolOutlined } from '@ant-design/icons-vue'
import { http } from '@/lib/Http.js'
import { useWebStore } from '@/stores/web.js'

const webStore = useWebStore()
const route = useRoute()
const router = useRouter()
// console.log(route.params.paperId) // 输出路由参数id

// 列配置
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '提交图片',
    dataIndex: 'image_paths',
    key: 'image_paths',
  },
  {
    title: '分数',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  },
]

function viewDetails(record) {
  // 使用编程式导航跳转到详情页，并传递 id 参数
  router.push({ path: `/teacher/testPaperDetails/${route.params.paperId}/${record.key}/${record.username}` })
}

// 数据数组，初始化为空
const data = ref([])

// 在组件挂载后调用接口
onMounted(async () => {
  try {
    const response = await http.post('/teacher/getAllStu', {
      username: webStore.info.userName,
      token: webStore.info.token,
      paperId: route.params.paperId,
    })
    // 假设response.data是你要的数据数组
    data.value = Object.values(response.data).map(item => ({
      key: item.id.toString(), // 将id转换为字符串，确保key是唯一的
      name: item.name, // 使用student作为姓名，因为name字段为null
      username: item.student,
      image_paths: `${item.image_paths}`,
      score: item.score,
    }))
  } catch (error) {
    console.error('Fetching data failed:', error)
  }
})
</script>

<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <FieldStringOutlined />
        <span>
          姓名
        </span>
      </template>
      <template v-if="column.key === 'username'">
        <FieldNumberOutlined />
        <span>
          用户名
        </span>
      </template>

      <template v-if="column.key === 'image_paths'">
        <PictureOutlined />
        <span>
          提交图片
        </span>
      </template>
      <template v-if="column.key === 'score'">
        <BarChartOutlined />
        <span>
          成绩
        </span>
      </template>
      <template v-if="column.key === 'action'">
        <ToolOutlined />
        <span>
          操作
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <span>
          {{ record.name }}
        </span>
      </template>
      <template v-else-if="column.key === 'image_paths'">
        <a-image :src="record.image_paths" :width="100" />
      </template>
      <template v-else-if="column.key === 'score'">
        {{ record.score }}
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a @click="viewDetails(record)">查看模型评阅详情</a>

        </span>
      </template>
    </template>
  </a-table>
</template>
