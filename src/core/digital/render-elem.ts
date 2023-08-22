import { type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'
import type { Digital } from './custom-types'
import { createVoid } from '../render-helper'

export default {
  type: 'ssml-digital',
  renderElem: (elem: SlateElement, _children: VNode[] | null, editor: IDomEditor) => {
    const item = elem as Digital
    return createVoid({ ...item, plain: item.value }, () =>
      editor.emit('ssml-digital-close', editor, item)
    )
  }
}
