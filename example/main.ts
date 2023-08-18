import { createApp } from 'vue'
import App from './App.vue'

import 'element-plus/dist/index.css'
import '@wangeditor/editor/dist/css/style.css'
import '@/assets/main.scss'

import { Boot } from '@wangeditor/editor'
import { default as SSMLEditor, EditorCoreModule } from '@/index'

Boot.registerModule(EditorCoreModule)

const app = createApp(App)

app.use(SSMLEditor)

app.mount('#app')
