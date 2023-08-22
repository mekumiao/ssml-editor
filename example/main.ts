import { createApp } from 'vue'
import App from './App.vue'

import '@wangeditor/editor/dist/css/style.css'
import '@/assets/main.scss'

import EditorConfig from './config'
import SSMLEditorView from '@/index'

const app = createApp(App)
app.use(SSMLEditorView, EditorConfig)
app.mount('#app')
