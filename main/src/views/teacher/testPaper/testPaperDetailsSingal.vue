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
                    <a @click="sendEmail(record)">修改分数</a>
                    <a-divider type="vertical" />
                    <a @click="showGrade(record)">修改评语</a>
                </span>
            </template>
        </template>
    </a-table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useWebStore } from '@/stores/web.js';

const data = ref([]);
const webStore = useWebStore();
const route = useRoute();

const columns = [
    {
        title: '题号',
        dataIndex: 'questionId',
        key: 'questionId',
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
    },
    {
        title: '模型评语',
        dataIndex: 'parse',
        key: 'parse',
    },
    {
        title: '操作',
        key: 'action',
    },
];

onMounted(async () => {
    try {
        // 示例API请求，请替换为实际的API URL
        const response = await axios.post('/api/teacher/getStuQuestionScore', {
            username: "zh",
            token: "123",
            stuUsername: "zhang",
            paperId: "10"
        });
        // 假设responseData就是响应数据
        const responseData = response.data;

        const processedData = Object.keys(responseData.image_paths).map((key, index) => ({
            questionId: index + 1,
            image_paths: [`/api/${responseData.image_paths[key]}`],
            score: responseData.questionScore.find(q => q.question === index + 1)?.score || '',
            parse: responseData.questionScore.find(q => q.question === index + 1)?.parse || '',
        }));

        data.value = processedData;
    } catch (error) {
        console.error('Fetching data error:', error);
    }
});

function sendEmail(record) {
    // 实现发送邮件的逻辑
}

function showGrade(record) {
    // 实现显示成绩详情的逻辑
}
</script>