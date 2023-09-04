import { jsx, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor, SlateTransforms, DomEditor } from '@wangeditor/editor'
import type { Sub } from './custom-types'
import { throttle } from 'lodash'
import { removeNodeSpace } from '../helper'

export default {
  type: 'ssml-sub',
  renderElem: (elem: SlateElement, children: VNode[] | null, editor: IDomEditor) => {
    const { remark } = elem as Sub
    return (
      <span className="ssml-wrapper">
        <span
          className="remark"
          contentEditable="false"
          style={{ 'background-color': 'var(--ssml-sub)' }}
        >
          <span
            className="iconfont icon-roundclosefill"
            on={{
              click: throttle((event: Event) => {
                event.preventDefault()
                const path = DomEditor.findPath(editor, elem)
                removeNodeSpace(editor, path)
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
          style={{ color: 'var(--ssml-sub)' }}
        ></span>
        <span>{children}</span>
        <span
          className="data-content"
          contentEditable="false"
          attrs={{ 'data-content': '}' }}
          style={{ color: 'var(--ssml-sub)' }}
        ></span>
      </span>
    )
  },
}
