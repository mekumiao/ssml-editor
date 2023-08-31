import type { App, Plugin } from 'vue'

import { BarButton } from './bar-button'
import { BarInput } from './bar-input'
import { BarPopover } from './bar-popover'
import { BarSearch } from './bar-search'
import { BarWrapper, BarWrapperItem, BarWrapperGroup } from './bar-wrapper'
import { DragBox, constrainDragBounds } from './drag-box'

export default <Plugin>{
  install(app: App) {
    app.component('BarButton', BarButton)
    app.component('BarInput', BarInput)
    app.component('BarPopover', BarPopover)
    app.component('BarSearch', BarSearch)
    app.component('BarWrapper', BarWrapper)
    app.component('BarWrapperItem', BarWrapperItem)
    app.component('BarWrapperGroup', BarWrapperGroup)
    app.component('DragBox', DragBox)
  },
}

export {
  BarButton,
  BarInput,
  BarPopover,
  BarSearch,
  BarWrapper,
  BarWrapperItem,
  BarWrapperGroup,
  DragBox,
  constrainDragBounds,
}
