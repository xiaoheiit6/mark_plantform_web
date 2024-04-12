<template>
    <a-table :columns="columns" :data-source="data">
        <template #headerCell="{ column }">
            <template v-if="column.key === 'questionId'">
                <span>
                    <FieldNumberOutlined />
                    题号
                </span>
            </template>
            <template v-if="column.key === 'image_paths'">
                <span>
                    <PictureOutlined />
                    图片
                </span>
            </template>
            <template v-if="column.key === 'score'">
                <span>
                    <TrophyOutlined />
                    分数
                </span>
            </template>
            <template v-if="column.key === 'parse'">
                <span>
                    <CommentOutlined />
                    评语
                </span>
            </template>
            
        </template>

        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'questionId'">
                <span>
                    {{ record.questionId }}
                </span>
            </template>
            <template v-else-if="column.key === 'image_paths'">
                <a-image :src="record.image_paths" :width="100" />
            </template>
            <template v-else-if="column.key === 'score'">
                {{ record.score }}
            </template>
            
        </template>
    </a-table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'; // 确保你已经安装并导入了axios
import { useRoute, useRouter } from 'vue-router';
import { useWebStore } from '@/stores/web.js';
import { FieldNumberOutlined, PictureOutlined, TrophyOutlined, CommentOutlined } from '@ant-design/icons-vue';
const webStore = useWebStore();
const route = useRoute();
const router = useRouter();
// console.log(route.params.paperId) // 输出路由参数id

// 列配置
const columns = [
    {
        title: '题号',
        dataIndex: 'questionId',
        key: 'questionId',
        width: '8%',
    },
    {
        title: '图片',
        dataIndex: 'image_paths',
        key: 'image_paths'
    },
    {
        title: '分数',
        dataIndex: 'score',
        key: 'score',
        width: '8%',
    },
    {
        title: '评语',
        dataIndex: 'parse',
        key: 'parse',
    },

];




// 数据数组，初始化为空
const data = ref([]);

// 在组件挂载后调用接口
// 在组件挂载后调用接口
onMounted(async () => {
    try {
        const response = await axios.post('/api/student/getStuQuestionScore', {
            "username": webStore.info.userName,
            "token": webStore.info.token,
            "paperId": route.params.paperId
        });
        // 处理返回的数据
        const responseData = response.data;
        // 根据你的数据结构，可能需要对 responseData 进行一些处理，然后赋值给 data
        data.value = responseData.questionScore.map(item => {
            return {
                questionId: item.question,
                image_paths: `/api${responseData.image_paths[item.question]}`, // 根据 question 获取对应的图片路径
                score: item.score,
                parse: item.parse
            };
        });
    } catch (error) {
        console.error('接口调用失败:', error);
    }
});

</script>