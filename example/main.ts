import { createApp } from 'vue'
import App from './App.vue'

import '@wangeditor/editor/dist/css/style.css'
import '@/assets/main.scss'

import EditorConfig from './config'
import SSMLEditor from '@/index'

const app = createApp(App)
app.use(SSMLEditor, EditorConfig)
app.mount('#app')
