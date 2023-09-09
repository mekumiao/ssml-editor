import { type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default function (): UserConfig {
  return {
    plugins: [
      vue(),
      dts({
        compilerOptions: { noUnusedLocals: false },
        exclude: [
          'example/**',
          'node_modules/**',
          'vite.config.ts',
          'vite.config.dev.ts',
          'vite.config.prod.ts',
        ],
        insertTypesEntry: true,
      }),
    ],
    build: {
      lib: {
        entry: 'src/index.ts',
        name: 'SSMLEditor',
        formats: ['es', 'cjs', 'umd'],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.ts'),
        },
        external: ['vue', '@wangeditor/editor', 'element-plus', '@element-plus/icons-vue'],
        output: {
          exports: 'named',
          globals: {
            vue: 'Vue',
            '@wangeditor/editor': 'wangEditor',
            'element-plus': 'ElementPlus',
            '@element-plus/icons-vue': 'ElementPlusIconsVue',
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  }
}
