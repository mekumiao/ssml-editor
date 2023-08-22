import { type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'
import type { Changespeed } from './custom-types'
import { createWithChildren } from '../render-helper'

export default {
  type: 'ssml-changespeed',
  renderElem: (elem: SlateElement, children: VNode[] | null, editor: IDomEditor) => {
    const item = elem as Changespeed
    return createWithChildren(item, children, () =>
      editor.emit('ssml-changespeed-close', editor, item)
    )
  }
}
