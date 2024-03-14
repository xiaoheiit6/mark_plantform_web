import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useWebStore = defineStore('web', () => {
    const info = reactive({
        isLogin: false,
        token: "",
        userName: "",
    })


    return {
        info
    }
},
    {
        //持久化存储到 localStorage 中
        persist: true
    })

