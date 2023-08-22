import type { SlateElement } from '@wangeditor/editor'
import type { Read } from './custom-types'

export default {
  type: 'ssml-read',
  elemToHtml: (elem: SlateElement) => {
    const { phoneme, value } = elem as Read
    return `<w phoneme="${phoneme}">${value}</w>`
  }
}
