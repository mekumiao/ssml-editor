import type { SlateElement } from '@wangeditor/editor'
import type { Phoneme } from './custom-types'

export default {
  type: 'ssml-phoneme',
  elemToHtml: (elem: SlateElement, childrenHtml: string) => {
    const { remark, alphabet, ph } = elem as Phoneme
    const html = `<span
          data-w-e-type="ssml-phoneme"
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-alphabet="${alphabet}"
          data-ow-ph="${ph}"
        >${childrenHtml}</span>`
    return html
  },
}
