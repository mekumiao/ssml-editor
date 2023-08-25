import type { SlateDescendant } from '@wangeditor/editor'
import type { Sub } from './custom-types'

export default {
  selector: 'span[data-w-e-type="ssml-sub"]',
  parseElemHtml: (domElem: Element, children: SlateDescendant[]): Sub => {
    const remark = domElem.getAttribute('data-ow-remark') || ''
    const alias = domElem.getAttribute('data-ow-alias') || ''
    return {
      type: 'ssml-sub',
      remark: remark,
      alias: alias,
      children: children
    }
  }
}
