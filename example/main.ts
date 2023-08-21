import { createApp } from 'vue'
import App from './App.vue'

import '@wangeditor/editor/dist/css/style.css'
import '@/assets/main.scss'

import EditorConfig from './config'
import { Boot } from '@wangeditor/editor'
import { default as SSMLEditorView, EditorCoreModule } from '@/index'

Boot.registerModule(EditorCoreModule)

const app = createApp(App)

app.use(SSMLEditorView, EditorConfig)

app.mount('#app')
