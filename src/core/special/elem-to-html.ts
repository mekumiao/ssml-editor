import type { SlateElement } from '@wangeditor/editor'
import type { Special } from './custom-types'

export default {
  type: 'ssml-special',
  elemToHtml: (elem: SlateElement) => {
    const { src } = elem as Special
    return `<audio src="${src}" />`
  }
}
