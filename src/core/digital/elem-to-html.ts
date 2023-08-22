import type { SlateElement } from '@wangeditor/editor'
import type { Digital } from './custom-types'

export default {
  type: 'ssml-digital',
  elemToHtml: (elem: SlateElement, childrenHtml: string) => {
    const { interpretAs } = elem as Digital
    return `<say-as interpret-as="${interpretAs}">${childrenHtml}</say-as>`
  }
}
