import type { SlateElement } from '@wangeditor/editor'
import type { Voice } from './custom-types'

export default {
  type: 'ssml-voice',
  elemToHtml: (elem: SlateElement, childrenHtml: string) => {
    const { remark, name, effect } = elem as Voice
    const html = `<span
          data-w-e-type="ssml-voice"
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-name="${name}"
          data-ow-effect="${effect}"
        >${childrenHtml}</span>`
    return html
  },
}
