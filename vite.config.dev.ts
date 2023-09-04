import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'
import ElementPlus from 'unplugin-element-plus/vite'
import { type UserConfig } from 'vite'

export default function (): UserConfig {
  return {
    plugins: [vue(), ElementPlus({})],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  }
}
