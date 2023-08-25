import type { SlateDescendant } from '@wangeditor/editor'
import type { P } from './custom-types'

export default {
  selector: 'span[data-w-e-type="ssml-p"]',
  parseElemHtml: (domElem: Element, children: SlateDescendant[]): P => {
    const remark = domElem.getAttribute('data-ow-remark') || ''
    return {
      type: 'ssml-p',
      remark: remark,
      children: children
    }
  }
}
