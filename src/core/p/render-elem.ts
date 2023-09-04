import { h, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor, SlateTransforms, DomEditor } from '@wangeditor/editor'
import type { P } from './custom-types'
import { throttle } from 'lodash'

export default {
  type: 'ssml-p',
  renderElem: (elem: SlateElement, children: VNode[] | null, editor: IDomEditor) => {
    const { remark } = elem as P
    return h('span.ssml-wrapper', [
      h(
        `span.remark`,
        {
          props: { contentEditable: false },
          style: {
            backgroundColor: 'var(--ssml-p)',
          },
        },
        [
          h(`span.iconfont.icon-roundclosefill`, {
            on: {
              click: throttle((event: Event) => {
                event.preventDefault()
                const path = DomEditor.findPath(editor, elem)
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
        style: { color: `var(--ssml-p)` },
      }),
      h('span', children),
      h(`span.data-content`, {
        props: { contentEditable: false },
        attrs: { 'data-content': '}' },
        style: { color: 'var(--ssml-p)' },
      }),
    ])
  },
}
