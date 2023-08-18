import type { App, Plugin } from 'vue'

import { BarButton } from './bar-button'
import { BarInput } from './bar-input'

export default {
  install(app: App) {
    app.component('BarButton', BarButton)
    app.component('BarInput', BarInput)
  }
} as Plugin

export { BarButton, BarInput }
