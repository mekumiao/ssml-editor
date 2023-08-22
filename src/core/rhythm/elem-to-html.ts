import type { SlateElement } from '@wangeditor/editor'
import type { Rhythm } from './custom-types'

export default {
  type: 'ssml-rhythm',
  elemToHtml: (elem: SlateElement) => {
    const { time } = elem as Rhythm
    return `<break time="${time}" />`
  }
}
