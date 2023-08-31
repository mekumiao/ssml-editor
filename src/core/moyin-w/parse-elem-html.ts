import type { SlateDescendant } from '@wangeditor/editor'
import type { MoyinW } from './custom-types'

export default {
  selector: 'span[data-w-e-type="moyin-w"]',
  parseElemHtml: (domElem: Element, children: SlateDescendant[]): MoyinW => {
    const remark = domElem.getAttribute('data-ow-remark') || ''
    const phoneme = domElem.getAttribute('data-ow-phoneme') || ''
    return {
      type: 'moyin-w',
      remark: remark,
      phoneme: phoneme,
      children: children,
    }
  },
}
