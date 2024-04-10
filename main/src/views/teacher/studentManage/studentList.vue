<template>
    <a-table :columns="columns" :data-source="data">
        <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
                <span>
                    <smile-outlined />
                    姓名
                </span>
            </template>
        </template>

        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
                <span>
                    {{ record.name }}
                </span>
            </template>

            <template v-else-if="column.key === 'action'">
                <span>
                    <a @click="sendEmail(record)">下发邮件</a>
                    <a-divider type="vertical" />
                    <a @click="showGarde(record)">查看历史成绩</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title="确定要重置此学生的密码?" ok-text="是" cancel-text="否"
                        @confirm="() => confirmReSetStuPassword(record)">
                        <a>重置密码</a>
                    </a-popconfirm>
                </span>
            </template>
        </template>
    </a-table>

    <!-- 成绩对话框 -->
    <a-modal :open="open" title="成绩" @ok="handleOkGarde" @cancel="handleCancelGarde">
        <v-chart class="chart" :option="option" />
    </a-modal>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import axios from 'axios';
import { useWebStore } from '@/stores/web.js';
import { message } from 'ant-design-vue';
import { use } from 'echarts/core'
import { LineChart, PieChart } from 'echarts/charts'
import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from "vue-echarts";


use([GridComponent, LineChart, CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent, PieChart])

const webStore = useWebStore();
const columns = [
    // 根据返回的数据结构调整columns定义
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '学生用户名',
        dataIndex: 'stuUsername',
        key: 'stuUsername',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '已提交',
        dataIndex: 'submitted',
        key: 'submitted',
    },
    {
        title: '试卷总数',
        dataIndex: 'total',
        key: 'total',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action'
    }
    // 您可以根据需要继续添加或修改列
];
const open = ref(false);

const data = ref();
const data1 = ref([]);
const data2 = ref([]);
const option = computed(() => {
    return {
        title: {
            text: '成绩分布趋势',
            subtext: 'Grade Data',
            left: 'center'
        },
        xAxis: {
            type: 'category',
            data: data1.value
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: data2.value,
                type: 'line',
                smooth: true
            }
        ]
    }
})
onMounted(async () => {
    try {
        const response = await axios.post('/api/teacher/getStuList', {
            username: webStore.info.userName,
            token: webStore.info.token,
        });
        data.value = response.data; // 假设API返回的就是数组形式的数据
    } catch (error) {
        console.error(error);
    }
});


// 处理查看成绩的逻辑
const showGarde = (record) => {
    const grades = record.grade;
    const formattedGrades = [];
    const grade = [];
    // 遍历 grade 对象中的键
    for (const key in grades) {
        if (Object.hasOwnProperty.call(grades, key)) {
            // 创建包含键和值的对象
            const gradeObj = {
                key: key,
                value: grades[key]
            };
            // 将对象推入数组
            formattedGrades.push(gradeObj.key);
            grade.push(gradeObj.value);
        }
    }

    // 将格式化后的成绩数组放入 data 中
    data1.value = formattedGrades;
    data2.value = grade;
    console.log(data1)
    console.log(data2)
    open.value = true;
};
const handleOkGarde = () => {
    open.value = false;
};

const handleCancelGarde = () => {
    open.value = false;
};

const confirmReSetStuPassword = (record) => {
    console.log(record.stuUsername)
    const reInfo = reactive({
        username: webStore.info.userName,
        token: webStore.info.token,
        stuUsername: record.stuUsername,
        newPassword: '123456'
    })

    axios.post('/api/teacher/setStuPassword', reInfo)
        .then(response => {
            message.success("已经将学生的密码重置为123456 !");
            console.log(response)
        })
        .catch(e => {
            console.log(e)
        })
};


</script>

<style scoped>
.chart {
    height: 400px;
    width: 500px;
}
</style>