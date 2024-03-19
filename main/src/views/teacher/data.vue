<template>
    <div style="display: flex;">
        <v-chart class="chart" :option="option" />
        <v-chart class="chart" :option="option2" />
    </div>
</template>

<script setup>

import { ref, computed } from 'vue'
import { use } from 'echarts/core'
import { LineChart, PieChart } from 'echarts/charts'
import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from "vue-echarts";
import { useWebStore } from '@/stores/web.js';
const webStore = useWebStore()
use([GridComponent, LineChart, CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent, PieChart])



const option = computed(() => {
    return {
        title: {
            text: '折线图',
            subtext: 'Fake Data',
            left: 'center'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 's']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 130, 160],
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
                name: '来自：',
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