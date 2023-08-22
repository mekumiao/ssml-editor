import { type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'
import type { Read } from './custom-types'
import { createVoid } from '../render-helper'

export default {
  type: 'ssml-read',
  renderElem: (elem: SlateElement, _children: VNode[] | null, editor: IDomEditor) => {
    const item = elem as Read
    return createVoid({ ...item, plain: item.value }, () => {
      editor.emit('ssml-read-close', editor, item)
    })
  }
}
