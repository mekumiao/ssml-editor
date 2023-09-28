import '@wangeditor/editor/dist/css/style.css'
import './assets/main.scss'

import type { App, Plugin } from 'vue'
import { createPinia, setActivePinia } from 'pinia'

import { type PartialSSMLEditorConfig, setConfig } from './config'

export type { FilterBarSearch } from './components/bar-search/data'
export type { AudioInfo } from './menu/conversion-menu/data'
export type { RecentUsageSpeaker } from './menu/management-menu/data'

export * from './view'
export * from './model'
export * from './config'
export * from './utils'
export * from './serialize'
export * from './stores'
export * from './event-bus'

export default <Plugin>{
  install(app: App, config?: PartialSSMLEditorConfig) {
    setConfig(config)
    const pinia = app.config.globalProperties.$pinia
    if (pinia) {
      setActivePinia(pinia)
    } else {
      app.use(createPinia())
    }
  },
}
