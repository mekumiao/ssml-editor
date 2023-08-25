import type { Break } from './custom-types'

export default {
  selector: 'span[data-w-e-type="ssml-break"]',
  parseElemHtml: (domElem: Element): Break => {
    const remark = domElem.getAttribute('data-ow-remark') || ''
    const time = domElem.getAttribute('data-ow-time') || ''
    const strength = domElem.getAttribute('data-ow-strength') || ''
    return {
      type: 'ssml-break',
      remark: remark,
      time: time,
      strength: strength as any,
      children: [{ text: '' }]
    }
  }
}
