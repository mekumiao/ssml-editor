import type { SlateElement } from '@wangeditor/editor'
import type { P } from './custom-types'

export default {
  type: 'ssml-p',
  elemToHtml: (elem: SlateElement, childrenHtml: string) => {
    const { remark } = elem as P
    const html = `<span
          data-w-e-type="ssml-p"
          data-w-e-is-inline
          data-ow-remark="${remark}"
        >${childrenHtml}</span>`
    return html
  },
}
