<template>
    <a-table :columns="columns" :data-source="data">
        <template #headerCell="{ column }">
            <template v-if="column.key === 'paperName'">
                <span>
                    <smile-outlined />
                    试卷
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
                    <a @click="showGarde(record)">查看成绩</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title="确定要删除?" ok-text="是" cancel-text="否" @confirm="() => confirmDelete(record)"
                        @cancel="cancel">
                        <a>删除</a>
                    </a-popconfirm>
                </span>
            </template>

        </template>
    </a-table>

    <!-- 成绩对话框 -->
    <a-modal :open="open" title="成绩" @ok="handleOkGarde" @cancel="handleCancelGarde">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </a-modal>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import axios from 'axios';
import { SmileOutlined } from '@ant-design/icons-vue';
import { useWebStore } from '@/stores/web.js';
import { useRouter } from 'vue-router';

const router = useRouter();
// 使用WebStore
const webStore = useWebStore();
const selectedKey = ref('');
const open = ref(false);

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
]);

// 试卷数据，初始为空数组
const data = ref([]);


const viewDetails = (record) => {
  // 使用编程式导航跳转到详情页，并传递 paperId 参数
  router.push({ path: `/teacher/testPaperDetails/${ record.paperId }` })
};

// 从后端获取试卷数据
const fetchPapers = async () => {
    try {
        const response = await axios.post('/api/teacher/getAllPaper', {
            username: webStore.info.userName,
            token: webStore.info.token
        });
        data.value = response.data.map(item => ({
            key: item.paperId.toString(),
            ...item
        }));
    } catch (error) {
        message.error('请求试卷数据失败');
        console.error(error);
    }
};

// 组件挂载时请求数据
onMounted(fetchPapers);

// 处理查看成绩的逻辑
const showGarde = (record) => {
    selectedKey.value = record.key;
    console.log(record.key);
    open.value = true;
};

const handleOkGarde = () => {
    open.value = false;
};

const handleCancelGarde = () => {
    open.value = false;
};

//发送删除请求
const deletePaper = async (paperId) => {
    try {
        // 发送删除请求
        const response = await axios.post('/api/teacher/deletePaper', {
            username: webStore.info.userName,
            token: webStore.info.token,
            paperId: paperId
        });

        // 根据实际情况处理响应，下面是一个基本示例
        if (response.data.code === 200) {
            // 从data中移除已删除的试卷
            data.value = data.value.filter(item => item.paperId.toString() !== paperId);
            message.success('试卷删除成功');
        } else {
            // 处理错误情况（例如显示错误消息）
            message.error('试卷删除失败');
        }
    } catch (error) {
        // 捕获并处理请求错误
        console.error('删除试卷时发生错误：', error);
        message.error('删除试卷时发生错误');
    }
}



//点击确定删除时函数
const confirmDelete = (record) => {
    deletePaper(record.paperId.toString());
};

</script>