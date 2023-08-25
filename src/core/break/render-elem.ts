import { h, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor, SlateTransforms, DomEditor } from '@wangeditor/editor'
import type { Break } from './custom-types'
import throttle from 'lodash.throttle'

export default {
  type: 'ssml-break',
  renderElem: (elem: SlateElement, _children: VNode[] | null, editor: IDomEditor) => {
    const { remark } = elem as Break
    return h(
      'span.ssml-wrapper',
      {
        props: { contentEditable: false }
      },
      [
        h(
          `span.remark`,
          {
            style: {
              backgroundColor: 'var(--ssml-break)'
            }
          },
          [
            h(`span.iconfont.icon-roundclosefill`, {
              on: {
                click: throttle((event: Event) => {
                  event.preventDefault()
                  const path = DomEditor.findPath(editor, elem)
                  SlateTransforms.delete(editor, { at: path })
                })
              }
            }),
            h(`span.data-content`, { attrs: { 'data-content': remark } })
          ]
        ),
        h(`span.data-content`, {
          attrs: { 'data-content': '|' },
          style: { color: `var(--ssml-break)` }
        })
      ]
    )
  }
}
