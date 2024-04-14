<template>
    <div style="display: flex;">
        <v-chart class="chart" :option="option" />
        <v-chart class="chart" :option="option2" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { use } from 'echarts/core'
import { LineChart, PieChart } from 'echarts/charts'
import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from "vue-echarts";
import axios from 'axios';
import { useWebStore } from '@/stores/web.js';

const webStore = useWebStore()
use([GridComponent, LineChart, CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent, PieChart])

// 创建响应式数据
const chartData = ref({
    xAxisData: [],
    seriesData: []
});

// 在组件挂载后发起数据请求
onMounted(() => {
    fetchChartData();
});

// 请求数据函数
const fetchChartData = async () => {
    try {
        const response = await axios.post("/api/teacher/paperAverage", {
            username: webStore.info.userName,
            token: webStore.info.token
        });
        const paperAverage = response.data.paperAverage;
        const xAxisData = [];
        const seriesData = [];

        // 遍历返回的数据对象
        for (const key in paperAverage) {
            xAxisData.push(`试卷 ${key}`);
            seriesData.push(paperAverage[key]);
        }

        // 更新图表数据
        chartData.value = {
            xAxisData,
            seriesData
        };
    } catch (error) {
        console.error("请求数据失败:", error);
    }
};

// 计算属性更新图表配置
const option = computed(() => {
    return {
        title: {
            text: '试卷平均分分布',
            subtext: '近期考试平均分',
            left: 'center'
        },
        xAxis: {
            type: 'category',
            data: chartData.value.xAxisData
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: chartData.value.seriesData,
                type: 'line',
                smooth: true
            }
        ]
    }
});

const option2 = computed(() => {
    return {
        title: {
            text: '提交进度',
            subtext: '学生试卷提交进度',
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
                name: '试卷数：',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 7, name: '已提交' },
                    { value: 3, name: '未提交' }
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
});

</script>

<style scoped>
.chart {
    height: 450px;
    width: 550px;
    margin: 10px;
}
</style>
