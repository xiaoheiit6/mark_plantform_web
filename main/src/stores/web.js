import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useWebStore = defineStore('web', () => {
    const web = reactive({
        title: 'aa',
        count: 10
    })
    return {
        web,
    }
})

