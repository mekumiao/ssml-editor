import type { SlateElement } from '@wangeditor/editor'
import type { W } from './custom-types'

export default {
  type: 'ssml-s',
  elemToHtml: (elem: SlateElement, childrenHtml: string) => {
    const { remark } = elem as W
    const html = `<span
          data-w-e-type="ssml-s"
          data-w-e-is-void
          data-w-e-is-inline
          data-ow-remark="${remark}"
        >${childrenHtml}</span>`
    return html
  }
}
