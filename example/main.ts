import { createApp } from 'vue'
import App from './App.vue'

import 'element-plus/dist/index.css'
import '@/assets/main.scss'

import SSMLEditor from '@/index'

const app = createApp(App)
app.use(SSMLEditor)
app.mount('#app')
