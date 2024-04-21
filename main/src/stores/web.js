import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useWebStore = defineStore('web', () => {
  const info = reactive({
    // id 0 student  1 teacher
    id: -1,
    userName: '',
    realName: '',
    token: '',
    isLogin: false,
  })
  return {
    info,
  }
}, {
  // 持久化存储到 localStorage 中
  persist: true,
})
