import type { SlateElement } from '@wangeditor/editor'
import type { Changespeed } from './custom-types'

export default {
  type: 'ssml-changespeed',
  elemToHtml: (elem: SlateElement, childrenHtml: string) => {
    const { rate } = elem as Changespeed
    return `<prosody rate="${rate}">${childrenHtml}</prosody>`
  }
}
