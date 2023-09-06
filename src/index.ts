import '@wangeditor/editor/dist/css/style.css'
import './assets/main.scss'

import type { App, Plugin } from 'vue'
import { createPinia, setActivePinia } from 'pinia'

import EditorViewPlugin, { EditorView } from './view'
import { type SSMLEditorConfig, proviceConfig } from './config'

import type { FilterBarSearch } from './components/bar-search'
import type { AudioInfo } from './menu/conversion-menu/data'
import type { RecentUsageSpeaker } from './menu/management-menu/data'

export * from './constant'
export * from './model'
export * from './config'
export * from './utils'
export * from './serialize'

export default <Plugin>{
  install(app: App, config?: SSMLEditorConfig) {
    proviceConfig(app, config)
    const pinia = app.config.globalProperties.$pinia
    if (pinia) {
      setActivePinia(pinia)
    } else {
      app.use(createPinia())
    }
    app.use(EditorViewPlugin)
  },
}

export { EditorView }

export type { FilterBarSearch, AudioInfo, RecentUsageSpeaker }
