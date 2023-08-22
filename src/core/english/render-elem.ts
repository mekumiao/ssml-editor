import { type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'
import type { English } from './custom-types'
import { createVoid } from '../render-helper'

export default {
  type: 'ssml-english',
  renderElem: (elem: SlateElement, _children: VNode[] | null, editor: IDomEditor) => {
    const item = elem as English
    return createVoid({ ...item, plain: item.word }, () =>
      editor.emit('ssml-english-close', editor, item)
    )
  }
}
