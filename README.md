# Blog-React-Express-Mysql

This is a full-stack development of Personal Blog By React,Node(Express),Mysql

(***please pay attention to the version When you install mysql
Here the default use of mysql 18.x or above***)

The original database configuration for MySql in db.js below, you can change it on your own:

```
import mysql from 'mysql'

export const db = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    database:'blog'
})
```

Packaging and building are done through Vite.

Some basic front-end configurations settings are set via vite.config.js,for example :multiple front-end server access proxies configurations.

```
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


```
