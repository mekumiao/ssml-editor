import { jsx, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'
import type { S } from './custom-types'
import { handleSSMLRemarkClick, handleUnwrapNodes } from '../helper'

export default {
  type: 'ssml-s',
  renderElem: (elem: SlateElement, children: VNode[] | null, editor: IDomEditor) => {
    const ssml_elem = elem as S
    return (
      <span className="ssml-wrapper">
        <span
          className="remark"
          contentEditable="false"
          style={{ 'background-color': 'var(--ssml-s)' }}
          on={{
            mousedown: (event: Event) => event.preventDefault(),
            click: [handleSSMLRemarkClick(editor, ssml_elem)],
          }}
        >
          <span
            className="iconfont icon-roundclosefill"
            on={{ click: [handleUnwrapNodes(editor, ssml_elem)] }}
          ></span>
          <span className="data-content" attrs={{ 'data-content': ssml_elem.remark }}></span>
        </span>
        <span
          className="data-content"
          contentEditable="false"
          attrs={{ 'data-content': '{' }}
          style={{ color: 'var(--ssml-s)' }}
        ></span>
        <span>{children}</span>
        <span
          className="data-content"
          contentEditable="false"
          attrs={{ 'data-content': '}' }}
          style={{ color: 'var(--ssml-s)' }}
        ></span>
      </span>
    )
  },
}
