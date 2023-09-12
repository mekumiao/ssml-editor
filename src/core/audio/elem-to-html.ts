import type { IDomEditor, SlateElement } from '@wangeditor/editor'
import type { Audio } from './custom-types'

export default {
  type: 'ssml-audio',
  elemToHtml: (elem: SlateElement, childrenHtml: string, editor: IDomEditor) => {
    const { remark, src } = elem as Audio
    const isvoid = editor.isVoid(elem) ? 'data-w-e-is-void' : ''
    const html = `<span
          data-w-e-type="ssml-audio" ${isvoid}
          data-w-e-is-inline
          data-ow-src="${src}"
          data-ow-remark="${remark}"
        >${childrenHtml}</span>`
    return html
  },
}
