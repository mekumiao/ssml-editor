import { type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'
import type { Speaker } from './custom-types'
import { createVoid } from '../render-helper'

export default {
  type: 'ssml-speaker',
  renderElem: (elem: SlateElement, _children: VNode[] | null, editor: IDomEditor) => {
    const item = elem as Speaker
    return createVoid({ ...item, plain: item.word }, () =>
      editor.emit('ssml-speaker-close', editor, item)
    )
  }
}
