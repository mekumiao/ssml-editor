import type { App, Plugin } from 'vue'

import { BarButton } from './bar-button'
import { BarInput } from './bar-input'
import { BarPopover } from './bar-popover'
import { BarSearch } from './bar-search'
import { TopPanel } from './top-panel'
import { BarWrapper, BarWrapperItem, BarWrapperGroup } from './bar-wrapper'
import { DragBox } from './drag-box'

export default {
  install(app: App) {
    app.component('BarButton', BarButton)
    app.component('BarInput', BarInput)
    app.component('BarPopover', BarPopover)
    app.component('BarSearch', BarSearch)
    app.component('TopPanel', TopPanel)
    app.component('BarWrapper', BarWrapper)
    app.component('BarWrapperItem', BarWrapperItem)
    app.component('BarWrapperGroup', BarWrapperGroup)
    app.component('DragBox', DragBox)
  }
} as Plugin

export {
  BarButton,
  BarInput,
  BarPopover,
  BarSearch,
  TopPanel,
  BarWrapper,
  BarWrapperItem,
  BarWrapperGroup,
  DragBox
}
