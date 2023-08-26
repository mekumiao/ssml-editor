import type { SlateDescendant } from '@wangeditor/editor'
import type { MsttsExpressAs } from './custom-types'

export default {
  selector: 'span[data-w-e-type="ssml-mstts:express-as"]',
  parseElemHtml: (domElem: Element, children: SlateDescendant[]): MsttsExpressAs => {
    const remark = domElem.getAttribute('data-ow-remark') || ''
    const style = domElem.getAttribute('data-ow-style') || ''
    const styledegree = domElem.getAttribute('data-ow-styledegree') || ''
    const role = domElem.getAttribute('data-ow-role') || ''
    return {
      type: 'ssml-mstts:express-as',
      style: style,
      remark: remark,
      styledegree: styledegree as any,
      role: role,
      children: children
    }
  }
}
