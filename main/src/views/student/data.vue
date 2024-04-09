<template>
    <div style="display: flex;">
        <v-chart class="chart" :option="option" />
        <v-chart class="chart" :option="option2" />
    </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { use } from 'echarts/core'
import { LineChart, PieChart } from 'echarts/charts'
import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from "vue-echarts";
import { useWebStore } from '@/stores/web.js';
import axios from 'axios'
const webStore = useWebStore()
use([GridComponent, LineChart, CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent, PieChart])


const data1 = ref([]);
const data2 = ref([]);

onMounted(() => {
    getData()
})

const getData = () => {
    const info = reactive({
        // username: webStore.info.userName,
        // token: webStore.info.token

        username: "zhang",
        token:"123"
    })
    axios.post("/api/student/getStuGrades", info)
        .then(response => {
            const grades = response.data.grade;
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
        })
        .catch(error => {
            console.log(error)
        })

}

const option = computed(() => {
    return {
        title: {
            text: '成绩分布趋势',
            subtext: 'Fake Data',
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

const option2 = computed(() => {
    return {
        title: {
            text: '饼图',
            subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '搜索引擎' },
                    { value: 735, name: '直链' },
                    { value: 580, name: '邮件' },
                    { value: 484, name: '基本广告' },
                    { value: 300, name: '视频广告' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
})

</script>

<style scoped>
.chart {
    height: 400px;
    width: 500px;
}
</style>