import { type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'
import type { Special } from './custom-types'
import { createSingleWithPlay } from '../render-helper'

export default {
  type: 'ssml-special',
  renderElem: (elem: SlateElement, _children: VNode[] | null, editor: IDomEditor) => {
    const item = elem as Special
    return createSingleWithPlay(item, {
      close: () => editor.emit('ssml-special-close', editor, item),
      play: () => editor.emit('ssml-special-play', editor, item)
    })
  }
}
