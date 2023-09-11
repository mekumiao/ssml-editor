import { jsx, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'
import type { SayAs } from './custom-types'
import { handleGrayscaleControl, handleUnwrapNodes } from '../helper'

export default {
  type: 'ssml-say-as',
  renderElem: (elem: SlateElement, children: VNode[] | null, editor: IDomEditor) => {
    const { remark } = elem as SayAs
    return (
      <span className="ssml-wrapper">
        <span
          className="remark"
          contentEditable="false"
          style={{ 'background-color': 'var(--ssml-say-as)' }}
          on={handleGrayscaleControl()}
        >
          <span
            className="iconfont icon-roundclosefill"
            on={{
              click: [handleGrayscaleControl().mouseleave, handleUnwrapNodes(editor, elem)],
            }}
          ></span>
          <span className="data-content" attrs={{ 'data-content': remark }}></span>
        </span>
        <span
          className="data-content"
          contentEditable="false"
          attrs={{ 'data-content': '{' }}
          style={{ color: 'var(--ssml-say-as)' }}
        ></span>
        <span>{children}</span>
        <span
          className="data-content"
          contentEditable="false"
          attrs={{ 'data-content': '}' }}
          style={{ color: 'var(--ssml-say-as)' }}
        ></span>
      </span>
    )
  },
}
