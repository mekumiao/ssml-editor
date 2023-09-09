import { jsx, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'
import type { Break } from './custom-types'
import { handleDeleteNode, handleGrayscaleControl } from '../helper'

export default {
  type: 'ssml-break',
  renderElem: (elem: SlateElement, _children: VNode[] | null, editor: IDomEditor): VNode => {
    const { remark } = elem as Break
    return (
      <span className="ssml-wrapper" contentEditable="false">
        <span
          className="remark"
          style={{ 'background-color': 'var(--ssml-break)' }}
          on={handleGrayscaleControl()}
        >
          <span
            className="iconfont icon-roundclosefill"
            on={{ click: [handleGrayscaleControl().mouseleave, handleDeleteNode(editor, elem)] }}
          ></span>
          <span className="data-content" attrs={{ 'data-content': remark }}></span>
        </span>
        <span className="iconfont icon-tingdun" style={{ color: 'var(--ssml-break)' }}></span>
      </span>
    )
  },
}
