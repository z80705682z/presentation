import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 或者原本的引入方式，Vite 預期它是這樣寫的

// https://vitejs.dev/config/
export default defineConfig({
  base: '/presentation/',
  plugins: [
    react(),
    tailwindcss()
  ]
})
