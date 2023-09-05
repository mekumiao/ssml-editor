import { jsx, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor, SlateTransforms, DomEditor } from '@wangeditor/editor'
import type { Emphasis } from './custom-types'
import { throttle } from 'lodash'

export default {
  type: 'ssml-emphasis',
  renderElem: (elem: SlateElement, children: VNode[] | null, editor: IDomEditor) => {
    const { remark } = elem as Emphasis
    return (
      <span className="ssml-wrapper">
        <span
          className="remark"
          contentEditable="false"
          style={{ 'background-color': 'var(--ssml-emphasis)' }}
        >
          <span
            className="iconfont icon-roundclosefill"
            on={{
              click: throttle((event: Event) => {
                event.preventDefault()
                const path = DomEditor.findPath(editor, elem)
                SlateTransforms.unwrapNodes(editor, { at: path })
              }),
            }}
          ></span>
          <span className="data-content" attrs={{ 'data-content': remark }}></span>
        </span>
        <span
          className="data-content"
          contentEditable="false"
          attrs={{ 'data-content': '{' }}
          style={{ color: 'var(--ssml-emphasis)' }}
        ></span>
        <span>{children}</span>
        <span
          className="data-content"
          contentEditable="false"
          attrs={{ 'data-content': '}' }}
          style={{ color: 'var(--ssml-emphasis)' }}
        ></span>
      </span>
    )
  },
}
