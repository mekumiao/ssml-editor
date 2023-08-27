import { h, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor, SlateTransforms, DomEditor } from '@wangeditor/editor'
import type { MsttsExpressAs } from './custom-types'
import throttle from 'lodash.throttle'

export default {
  type: 'ssml-mstts:express-as',
  renderElem: (elem: SlateElement, children: VNode[] | null, editor: IDomEditor) => {
    const { remark } = elem as MsttsExpressAs
    return h('span.ssml-wrapper', [
      h(
        `span.remark`,
        {
          props: { contentEditable: false },
          style: {
            backgroundColor: 'var(--ssml-mstts--express-as)',
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
        attrs: { 'data-content': '{{' },
        style: { color: `var(--ssml-mstts--express-as)` },
      }),
      h('span', children),
      h(`span.data-content`, {
        attrs: { 'data-content': '}}' },
        style: { color: 'var(--ssml-mstts--express-as)' },
      }),
    ])
  },
}
