import type { SlateElement } from '@wangeditor/editor'
import type { Digital } from './custom-types'

export default {
  type: 'ssml-digital',
  elemToHtml: (elem: SlateElement) => {
    const { interpretAs, value } = elem as Digital
    return `<say-as interpret-as="${interpretAs}">${value}</say-as>`
  }
}
