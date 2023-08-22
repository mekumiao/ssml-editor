import type { SlateElement } from '@wangeditor/editor'
import type { English } from './custom-types'

export default {
  type: 'ssml-english',
  elemToHtml: (elem: SlateElement) => {
    const { phoneme, word } = elem as English
    return `<p ph="${phoneme}">${word}</p>`
  }
}
