import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
        // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
        '/api': {
          target: "http://localhost:8800/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
    }
  }
})
