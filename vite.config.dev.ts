import { type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default function (): UserConfig {
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  }
}
