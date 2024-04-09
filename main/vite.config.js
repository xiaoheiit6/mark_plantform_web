import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias:{
      '@':path.resolve(__dirname,'src')
    }
  },

  server: {
    proxy: {
      '/api': {
        //target:"http://192.168.199.41:8888/",
        target:"http://api.111138.xyz:5555/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,"")
      }
    }
  }
  
})
