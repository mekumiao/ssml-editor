import type { App, Plugin } from 'vue'

import EditorView from './editor-view.vue'

export default <Plugin>{
  install(app: App) {
    app.component('EditorView', EditorView)
  },
}

export { EditorView }
