import type { App, Plugin } from 'vue'

import EditorComponentsPlugin from './components'
import EditorMenuPlugin from './menu'
import EditorView from './view'
import { EMITTER_EVENT } from './constant'
import { emitter } from './event-bus'
import { type SSMLEditorConfig, provideGlobalConfig } from './config'
import SSMLCorePlugin from './core'

export * from './constant'
export * from './model'
export * from './config'

export default {
  install(app: App, config?: SSMLEditorConfig) {
    const globalEditorConfig = provideGlobalConfig(app.provide, config)
    emitter.on(EMITTER_EVENT.ERROR, globalEditorConfig.handleError)

    app.use(SSMLCorePlugin)
    app.use(EditorComponentsPlugin)
    app.use(EditorMenuPlugin)
    app.use(EditorView)
  }
} as Plugin

import './assets/main.scss'
