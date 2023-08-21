import type { App, Plugin } from 'vue'

import EditorComponentsPlugin from './components'
import EditorMenuPlugin from './menu'
import EditorView from './view'
import { PROVIDER_KEY } from './constant'

export * from './components'
export * from './menu'
export * from './core'
export * from './utils'
export * from './view'
export * from './constant'

export { default as EditorCoreModule } from './core'

export default {
  install(app: App, config?: SSMLEditorConfig) {
    console.log(config)
    app.provide(PROVIDER_KEY.EDITORCONFIG, config ?? {})
    app.use(EditorComponentsPlugin)
    app.use(EditorMenuPlugin)
    app.use(EditorView)
  }
} as Plugin

import './assets/main.scss'
