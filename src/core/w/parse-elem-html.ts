import type { SlateDescendant } from '@wangeditor/editor'
import type { W } from './custom-types'

export default {
  selector: 'span[data-w-e-type="ssml-w"]',
  parseElemHtml: (domElem: Element, children: SlateDescendant[]): W => {
    const remark = domElem.getAttribute('data-ow-remark') || ''
    return {
      type: 'ssml-w',
      remark: remark,
      children: children
    }
  }
}
