import { type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'
import type { Continuous } from './custom-types'
import { createVoid } from '../render-helper'

export default {
  type: 'ssml-continuous',
  renderElem: (elem: SlateElement, _children: VNode[] | null, editor: IDomEditor) => {
    const item = elem as Continuous
    return createVoid({ ...item, plain: item.value }, () =>
      editor.emit('ssml-continuous-close', editor, item)
    )
  }
}
