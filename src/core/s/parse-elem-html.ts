import type { SlateDescendant } from '@wangeditor/editor'
import type { S } from './custom-types'

export default {
  selector: 'span[data-w-e-type="ssml-s"]',
  parseElemHtml: (domElem: Element, children: SlateDescendant[]): S => {
    const remark = domElem.getAttribute('data-ow-remark') || ''
    return {
      type: 'ssml-s',
      remark: remark,
      children: children,
    }
  },
}
