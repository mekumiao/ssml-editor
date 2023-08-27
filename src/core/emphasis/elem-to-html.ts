import type { SlateElement } from '@wangeditor/editor'
import type { Emphasis } from './custom-types'

export default {
  type: 'ssml-emphasis',
  elemToHtml: (elem: SlateElement, childrenHtml: string) => {
    const { remark, level } = elem as Emphasis
    const html = `<span
          data-w-e-type="ssml-emphasis"
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-level="${level}"
        >${childrenHtml}</span>`
    return html
  },
}
