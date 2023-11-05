import '@wangeditor/editor/dist/css/style.css'
import 'highlight.js/styles/atom-one-dark.css'
import './assets/main.scss'

import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/javascript'
import hljsVuePlugin from '@highlightjs/vue-plugin'

import type { App, Plugin } from 'vue'
import { createPinia, setActivePinia } from 'pinia'

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

hljs.registerLanguage('xml', xml)

export default <Plugin>{
  install(app: App) {
    app.use(hljsVuePlugin)
    const pinia = app.config.globalProperties.$pinia
    if (pinia) {
      setActivePinia(pinia)
    } else {
      app.use(createPinia())
    }
  },
}
