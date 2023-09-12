import type { SlateElement } from '@wangeditor/editor'
import type { MoyinW } from './custom-types'

export default {
  type: 'moyin-w',
  elemToHtml: (elem: SlateElement, childrenHtml: string) => {
    const { remark, phoneme = '' } = elem as MoyinW
    const html = `<span
          data-w-e-type="moyin-w"
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-phoneme="${phoneme}"
        >${childrenHtml}</span>`
    return html
  },
}
