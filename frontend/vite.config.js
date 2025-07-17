import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {'/api/pantryData': 'http://localhost:4000/',
      '/api/aiData': 'http://localhost:4000',
      '/api/recipeData': 'http://localhost:4000',
      '/api/expiredData': 'http://localhost:4000',
      '/api/pantryStats': 'http://localhost:4000',
      '/api/userData' : 'http://localhost:4000',
    }
  }
})
