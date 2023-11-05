import type { SlateElement } from '@wangeditor/editor'

export default {
  type: 'paragraph',
  elemToHtml: (_elem: SlateElement, childrenHtml: string) => {
    return `<paragraph data-ow-remark="mekumiao/ssml-editor">${childrenHtml}</paragraph>`
  },
}
