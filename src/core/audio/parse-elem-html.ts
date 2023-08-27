import type { SlateDescendant } from '@wangeditor/editor'
import type { Audio } from './custom-types'

export default {
  selector: 'span[data-w-e-type="ssml-audio"]',
  parseElemHtml: (domElem: Element, children: SlateDescendant[]): Audio => {
    const src = domElem.getAttribute('data-ow-src') || ''
    const remark = domElem.getAttribute('data-ow-remark') || ''
    return {
      type: 'ssml-audio',
      src: src,
      remark: remark,
      children: children,
    }
  },
}
