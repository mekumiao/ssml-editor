import { jsx, type VNode } from 'snabbdom'
import { SlateElement, type IDomEditor } from '@wangeditor/editor'

export default {
  type: 'paragraph',
  renderElem: (_elem: SlateElement, children: VNode[] | null, _editor: IDomEditor) => {
    return <p className="ssml-wrapper">{children}</p>
  },
}
