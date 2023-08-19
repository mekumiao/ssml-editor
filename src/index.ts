import type { App, Plugin } from 'vue'

import EditorComponentsPlugin from './components'
import EditorMenuPlugin from './menu'
import EditorView from './view'

export * from './components'
export * from './menu'
export * from './core'
export * from './utils'
export * from './view'

export { default as EditorCoreModule } from './core'

export default {
  install(app: App) {
    app.use(EditorComponentsPlugin)
    app.use(EditorMenuPlugin)
    app.use(EditorView)
  }
} as Plugin

import './assets/main.scss'
