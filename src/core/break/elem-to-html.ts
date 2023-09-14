import type { SlateElement } from '@wangeditor/editor'
import type { Break } from './custom-types'

export default {
  type: 'ssml-break',
  elemToHtml: (elem: SlateElement) => {
    const { remark, time = '', strength = 'medium' } = elem as Break
    const html = `<span
          data-w-e-type="ssml-break"
          data-w-e-is-void
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-time="${time}"
          data-ow-strength="${strength}"
        ></span>`
    return html
  },
}
