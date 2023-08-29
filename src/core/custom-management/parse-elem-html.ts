import type { SlateDescendant } from '@wangeditor/editor'
import type { CustomManagement } from './custom-types'

export default {
  selector: 'span[data-w-e-type="custom-management"]',
  parseElemHtml: (domElem: Element, children: SlateDescendant[]): CustomManagement => {
    const remark = domElem.getAttribute('data-ow-remark') || ''
    const name = domElem.getAttribute('data-ow-name') || ''
    const role = domElem.getAttribute('data-ow-role') || ''
    const style = domElem.getAttribute('data-ow-style') || ''
    const pitch = domElem.getAttribute('data-ow-pitch') || ''
    const rate = domElem.getAttribute('data-ow-rate') || ''
    return {
      type: 'custom-management',
      remark: remark,
      name: name,
      role: role,
      style: style,
      pitch: pitch,
      rate: rate,
      children: children,
    }
  },
}
