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
import {http} from '@/lib/Http.js';
const webStore = useWebStore()
use([GridComponent, LineChart, CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent, PieChart])


const data1 = ref([]);
const data2 = ref([]);
const pieData = ref([]);

onMounted(() => {
    console.log('test1');
    getData();
    getPieData();
    console.log('test2');
})

const getData = () => {
    const info = reactive({
        username: webStore.info.userName,
        token: webStore.info.token
    })
    http.post("/student/getStuGrades", info)
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

const getPieData = () => {
    http.post("/student/getLastPaper", {
        username: webStore.info.userName  // Change as necessary based on your authentication scheme
    }).then(response => {
        const questionScores = response.data.questionScore.map(item => ({
            value: parseInt(item.score), // Ensure numeric value
            name: `问题 ${item.question}`
        }));
        console.log(questionScores)
        pieData.value = questionScores;
    }).catch(error => {
        console.log(error);
    });
}

const option = computed(() => {
    return {
        title: {
            text: '成绩分布趋势',
            subtext: '分布趋势',
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
            text: '分数分布情况',
            subtext: '最新试卷分数',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        
        series: [
            {
                name: '分数分布',
                type: 'pie',
                radius: '50%',
                data: pieData.value,
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
    height: 450px;
    width: 550px;
    margin: 10px;
}
</style>