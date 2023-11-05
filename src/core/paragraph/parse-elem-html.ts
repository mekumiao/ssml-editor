import type { SlateDescendant } from '@wangeditor/editor'
import type { Paragraph } from './custom-types'

export default {
  selector: 'paragraph',
  parseElemHtml: (_domElem: Element, children: SlateDescendant[]): Paragraph => {
    return {
      type: 'paragraph',
      children: children,
    }
  },
}
