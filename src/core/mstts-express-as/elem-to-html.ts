import type { SlateElement } from '@wangeditor/editor'
import type { MsttsExpressAs } from './custom-types'

export default {
  type: 'ssml-mstts:express-as',
  elemToHtml: (elem: SlateElement, childrenHtml: string) => {
    const { remark, style, role, styledegree } = elem as MsttsExpressAs
    const html = `<span
          data-w-e-type="ssml-mstts:express-as"
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-style="${style}"
          data-ow-styledegree="${styledegree ?? ''}"
          data-ow-role="${role ?? ''}"
        >${childrenHtml}</span>`
    return html
  },
}
