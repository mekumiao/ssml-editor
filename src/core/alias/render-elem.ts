import { type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'
import type { Alias } from './custom-types'
import { createVoid } from '../render-helper'

export default {
  type: 'ssml-alias',
  renderElem: (elem: SlateElement, _children: VNode[] | null, editor: IDomEditor) => {
    const item = elem as Alias
    return createVoid({ ...item, plain: item.value }, () =>
      editor.emit('ssml-alias-close', editor, item)
    )
  }
}
