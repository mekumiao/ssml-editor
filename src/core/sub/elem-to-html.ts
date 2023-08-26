import type { SlateElement } from '@wangeditor/editor'
import type { Sub } from './custom-types'

export default {
  type: 'ssml-sub',
  elemToHtml: (elem: SlateElement, childrenHtml: string) => {
    const { remark, alias } = elem as Sub
    const html = `<span
          data-w-e-type="ssml-sub"
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-alias="${alias}"
        >${childrenHtml}</span>`
    return html
  }
}
