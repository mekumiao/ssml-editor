import { jsx, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor, DomEditor } from '@wangeditor/editor'
import type { CustomManagement } from './custom-types'
import throttle from 'lodash.throttle'
import { handleUnwrapNodes } from '../helper'
import { WANGEDITOR_EVENT } from '@/constant'

export default {
  type: 'custom-management',
  renderElem: (elem: SlateElement, children: VNode[] | null, editor: IDomEditor) => {
    const { remark } = elem as CustomManagement
    return (
      <span className="ssml-wrapper">
        <span
          className="remark"
          contentEditable="false"
          style={{ 'background-color': 'var(--custom-management)' }}
          on={{
            mousedown: (event: Event) => event.preventDefault(),
            click: throttle((event: Event) => {
              event.preventDefault()
              editor.select(DomEditor.findPath(editor, elem))
              editor.emit(WANGEDITOR_EVENT.SSML_ELEMENT_CLICK, editor, elem)
            }),
          }}
        >
          <span
            className="iconfont icon-roundclosefill"
            on={{ click: [handleUnwrapNodes(editor, elem)] }}
          ></span>
          <span className="data-content" attrs={{ 'data-content': remark }}></span>
        </span>
        <span
          className="data-content"
          contentEditable="false"
          attrs={{ 'data-content': '{{' }}
          style={{ color: 'var(--custom-management)' }}
        ></span>
        <span>{children}</span>
        <span
          className="data-content"
          contentEditable="false"
          attrs={{ 'data-content': '}}' }}
          style={{ color: 'var(--custom-management)' }}
        ></span>
      </span>
    )
  },
}
