import type { SlateElement } from '@wangeditor/editor'

export default {
  type: 'ssml-continuous',
  elemToHtml: (_elem: SlateElement, childrenHtml: string) => {
    return `<w>${childrenHtml}</w>`
  }
}
