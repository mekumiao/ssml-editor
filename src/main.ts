import './assets/main.scss'
import 'element-plus/dist/index.css'

import './module'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus, { size: 'default', zIndex: 3000 })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
