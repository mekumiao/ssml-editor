import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'
import ElementPlus from 'unplugin-element-plus/vite'
import typescript2 from 'rollup-plugin-typescript2'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

export default defineConfig({
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
      exclude: ['vite.config.ts']
    })
  ],
  build: {
    cssCodeSplit: true,
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
      external: ['vue', '@wangeditor/editor'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css') return 'style.css'
          return assetInfo.name || 'default.css'
        },
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
