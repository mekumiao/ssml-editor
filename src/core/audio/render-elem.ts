import { h, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor, SlateTransforms, DomEditor } from '@wangeditor/editor'
import type { Audio } from './custom-types'
import throttle from 'lodash.throttle'
import { playSound } from '@/utils'

export default {
  type: 'ssml-audio',
  renderElem: (elem: SlateElement, _children: VNode[] | null, editor: IDomEditor) => {
    const { remark, src } = elem as Audio
    return h('span.ssml-wrapper.no-line-height', [
      h(
        `span.remark.left`,
        {
          props: { contentEditable: false },
          style: {
            backgroundColor: 'var(--ssml-audio)'
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
          h(`span.iconfont.icon-play`, {
            on: {
              click: throttle((event: Event) => {
                event.preventDefault()
                playSound(src)
              })
            }
          }),
          h(`span.data-content`, { attrs: { 'data-content': remark } })
        ]
      )
    ])
  }
}
