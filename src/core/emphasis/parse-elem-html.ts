import type { SlateDescendant } from '@wangeditor/editor'
import type { Emphasis } from './custom-types'

export default {
  selector: 'span[data-w-e-type="ssml-emphasis"]',
  parseElemHtml: (domElem: Element, children: SlateDescendant[]): Emphasis => {
    const remark = domElem.getAttribute('data-ow-remark') || ''
    const level = domElem.getAttribute('data-ow-level') || ''
    return {
      type: 'ssml-emphasis',
      remark: remark,
      level: level as any,
      children: children
    }
  }
}
