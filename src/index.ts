import './assets/main.scss'

import type { App, Plugin } from 'vue'
import { createPinia } from 'pinia'

import EditorComponentsPlugin from './components'
import EditorMenuPlugin from './menu'
import EditorView from './view'
import { type SSMLEditorConfig, createGlobalEditorConfig } from './config'
import SSMLCorePlugin from './core'
import { useEditorStore } from './stores'

export * from './constant'
export * from './model'
export * from './config'

export default {
  install(app: App, config?: SSMLEditorConfig) {
    app.use(createPinia())
    app.use(() => {
      const { setGlobalEditConfig } = useEditorStore()
      setGlobalEditConfig(createGlobalEditorConfig(config))
    })
    app.use(SSMLCorePlugin)
    app.use(EditorComponentsPlugin)
    app.use(EditorMenuPlugin)
    app.use(EditorView)
  }
} as Plugin
