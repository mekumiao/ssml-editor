import { type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'
import type { Mute } from './custom-types'
import { createSingle } from '../render-helper'

export default {
  type: 'ssml-mute',
  renderElem: (elem: SlateElement, _children: VNode[] | null, editor: IDomEditor) => {
    const item = elem as Mute
    return createSingle(item, () => editor.emit('ssml-mute-close', editor, item))
  }
}
