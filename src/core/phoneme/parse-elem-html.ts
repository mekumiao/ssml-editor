import type { SlateDescendant } from '@wangeditor/editor'
import type { Phoneme } from './custom-types'

export default {
  selector: 'span[data-w-e-type="ssml-phoneme"]',
  parseElemHtml: (domElem: Element, children: SlateDescendant[]): Phoneme => {
    const remark = domElem.getAttribute('data-ow-remark') || ''
    const alphabet = domElem.getAttribute('data-ow-alphabet') || ''
    const ph = domElem.getAttribute('data-ow-ph') || ''
    return {
      type: 'ssml-phoneme',
      remark: remark,
      alphabet: alphabet,
      ph: ph,
      children: children,
    }
  },
}
