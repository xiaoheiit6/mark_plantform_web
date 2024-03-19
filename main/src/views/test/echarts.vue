<template>
  <v-chart class="chart" :option="option" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from "vue-echarts";

import { useWebStore } from '@/stores/web.js';
const webStore = useWebStore()

use([GridComponent, LineChart, CanvasRenderer])


const option = computed(() => {
  return {
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


</script>

<style scoped>
.chart {
  height: 400px;
  width: 500px;
}
</style>