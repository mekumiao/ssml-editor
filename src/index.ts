import type { App, Plugin } from 'vue'

import EditorComponentsPlugin from './components'
import EditorMenuPlugin from './menu'
import EditorView from './view'
import { PROVIDER_KEY, EMITTER_EVENT } from './constant'
import { emitter } from './event-bus'
import { type SSMLEditorConfig } from './config'

export * from './components'
export * from './menu'
export * from './core'
export * from './utils'
export * from './view'
export * from './constant'
export * from './model'
export * from './config'

export { default as EditorCoreModule } from './core'

export default {
  install(app: App, config?: SSMLEditorConfig) {
    const editorConfig = config ?? ({} as SSMLEditorConfig)

    app.provide(PROVIDER_KEY.EDITORCONFIG, editorConfig)

    emitter.on(EMITTER_EVENT.ERROR, editorConfig.handleError)

    app.use(EditorComponentsPlugin)
    app.use(EditorMenuPlugin)
    app.use(EditorView)
  }
} as Plugin

import './assets/main.scss'
