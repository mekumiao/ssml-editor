import type { SlateElement } from '@wangeditor/editor'
import type { Audio } from './custom-types'

export default {
  type: 'ssml-audio',
  elemToHtml: (elem: SlateElement, childrenHtml: string) => {
    const { remark, src } = elem as Audio
    const html = `<span
          data-w-e-type="ssml-audio"
          data-w-e-is-void
          data-w-e-is-inline
          data-ow-src="${src}"
          data-ow-remark="${remark}"
        >${childrenHtml}</span>`
    return html
  },
}
