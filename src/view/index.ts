import type { App, Plugin } from 'vue'

import EditorView from './editor-view.vue'

export default {
  install(app: App) {
    app.component('EditorView', EditorView)
  },
} as Plugin

export { EditorView }
