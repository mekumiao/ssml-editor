import type { SlateDescendant } from '@wangeditor/editor'
import type { Prosody } from './custom-types'

export default {
  selector: 'span[data-w-e-type="ssml-prosody"]',
  parseElemHtml: (domElem: Element, children: SlateDescendant[]): Prosody => {
    const remark = domElem.getAttribute('data-ow-remark') || ''
    const contour = domElem.getAttribute('data-ow-contour') || ''
    const pitch = domElem.getAttribute('data-ow-pitch ') || ''
    const range = domElem.getAttribute('data-ow-range') || ''
    const rate = domElem.getAttribute('data-ow-rate') || undefined
    const volume = domElem.getAttribute('data-ow-volume') || ''
    return {
      type: 'ssml-prosody',
      remark: remark,
      contour: contour,
      pitch: pitch,
      range: range,
      rate: Number(rate),
      volume: volume,
      children: children
    }
  }
}
