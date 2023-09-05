import { h, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor, SlateTransforms, DomEditor } from '@wangeditor/editor'
import type { SayAs } from './custom-types'
import { throttle } from 'lodash'
import { removeNodeSpace } from '../helper'

export default {
  type: 'ssml-say-as',
  renderElem: (elem: SlateElement, children: VNode[] | null, editor: IDomEditor) => {
    const { remark } = elem as SayAs
    return h('span.ssml-wrapper', [
      h(
        `span.remark`,
        {
          props: { contentEditable: false },
          style: {
            backgroundColor: 'var(--ssml-say-as)',
          },
        },
        [
          h(`span.iconfont.icon-roundclosefill`, {
            on: {
              click: throttle((event: Event) => {
                event.preventDefault()
                const path = DomEditor.findPath(editor, elem)
                removeNodeSpace(editor, path)
                SlateTransforms.unwrapNodes(editor, { at: path })
              }),
            },
          }),
          h(`span.data-content`, { attrs: { 'data-content': remark } }),
        ],
      ),
      h(`span.data-content`, {
        props: { contentEditable: false },
        attrs: { 'data-content': '{' },
        style: { color: `var(--ssml-say-as)` },
      }),
      h('span', children),
      h(`span.data-content`, {
        props: { contentEditable: false },
        attrs: { 'data-content': '}' },
        style: { color: 'var(--ssml-say-as)' },
      }),
    ])
  },
}
