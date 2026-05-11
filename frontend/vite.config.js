import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    host: true,           // разрешает доступ с 0.0.0.0 и localhost
    port: 5173,           // явно указываем порт
    strictPort: true,     // не переключается на другой порт, если 5173 занят
    open: true,           // автоматически открывает браузер при запуске (удобно)

    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})