import { type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'
import ElementPlus from 'unplugin-element-plus/vite'
import typescript2 from 'rollup-plugin-typescript2'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

export default function (): UserConfig {
  return {
    plugins: [
      vue(),
      vueJsx(),
      ElementPlus({}),
      dts({
        exclude: ['example/**', 'node_modules/**'],
        insertTypesEntry: true
      }),
      typescript2({
        check: false,
        include: ['src/**/*.vue'],
        tsconfigOverride: {
          compilerOptions: {
            outDir: 'dist',
            sourceMap: true,
            declaration: true,
            declarationMap: true
          }
        },
        exclude: ['vite.config.ts', 'vite.config.dev.ts', 'vite.config.prod.ts']
      })
    ],
    build: {
      lib: {
        entry: 'src/index.ts',
        name: 'SSMLEditor',
        formats: ['es', 'cjs', 'umd'],
        fileName: (format) => `index.${format}.js`
      },
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.ts')
        },
        external: ['vue', '@wangeditor/editor', 'element-plus', '@element-plus/icons-vue'],
        output: {
          exports: 'named',
          globals: {
            vue: 'Vue',
            '@wangeditor/editor': 'wangEditor',
            'element-plus': 'ElementPlus',
            '@element-plus/icons-vue': 'ElementPlusIconsVue'
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
}
