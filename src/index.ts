import type { App, Plugin } from 'vue'

import EditorComponentsPlugin from './components'
import EditorMenuPlugin from './menu'

export * from './components'
export * from './menu'
export * from './core'

export { default as EditorCoreModule } from './core'

export default {
  install(app: App) {
    app.use(EditorComponentsPlugin)
    app.use(EditorMenuPlugin)
  }
} as Plugin

import './assets/main.scss'
