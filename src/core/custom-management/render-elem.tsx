import { jsx, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor, SlateTransforms, DomEditor } from '@wangeditor/editor'
import type { CustomManagement } from './custom-types'
import throttle from 'lodash.throttle'
import { removeNodeSpace, handleGrayscaleControl } from '../helper'
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
            ...handleGrayscaleControl(),
          }}
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
