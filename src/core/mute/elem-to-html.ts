import type { SlateElement } from '@wangeditor/editor'
import type { Mute } from './custom-types'

export default {
  type: 'ssml-mute',
  elemToHtml: (elem: SlateElement) => {
    const { time } = elem as Mute
    return `<break time="${time}" />`
  }
}
