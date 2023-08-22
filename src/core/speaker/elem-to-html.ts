import type { SlateElement } from '@wangeditor/editor'
import type { Speaker } from './custom-types'

export default {
  type: 'ssml-speaker',
  elemToHtml: (elem: SlateElement) => {
    const { phoneme, word } = elem as Speaker
    return `<p ph="${phoneme}">${word}</p>`
  }
}
