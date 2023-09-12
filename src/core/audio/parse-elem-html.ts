import type { SlateDescendant } from '@wangeditor/editor'
import type { Audio } from './custom-types'

export default {
  selector: 'span[data-w-e-type="ssml-audio"]',
  parseElemHtml: (domElem: Element, children: SlateDescendant[]): Audio => {
    const src = domElem.getAttribute('data-ow-src') || ''
    const remark = domElem.getAttribute('data-ow-remark') || ''
    const isvoid = domElem.hasAttribute('data-w-e-is-void')
    return {
      type: 'ssml-audio',
      src: src,
      remark: remark,
      children: isvoid ? [{ text: '' }] : children,
    }
  },
}
