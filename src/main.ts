import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import {
  Boot,
  SlateEditor,
  DomEditor,
  SlateTransforms,
  SlateNode,
  SlateText,
  SlateRange
} from '@wangeditor/editor'
import module, { $ } from './index'

Boot.registerModule(module)

window.$ = $
window.SlateEditor = SlateEditor
window.SlateNode = SlateNode
window.SlateText = SlateText
window.DomEditor = DomEditor
window.SlateTransforms = SlateTransforms
window.SlateRange = SlateRange

const app = createApp(App)

app.mount('#app')
