import { type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'
import type { Rhythm } from './custom-types'
import { createSingle } from '../render-helper'

export default {
  type: 'ssml-rhythm',
  renderElem: (elem: SlateElement, _children: VNode[] | null, editor: IDomEditor) => {
    const item = elem as Rhythm
    return createSingle(item, () => editor.emit('ssml-rhythm-close', editor, item))
  }
}
