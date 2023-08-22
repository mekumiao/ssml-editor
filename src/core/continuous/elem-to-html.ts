import type { SlateElement } from '@wangeditor/editor'
import type { Continuous } from '.'

export default {
  type: 'ssml-continuous',
  elemToHtml: (elem: SlateElement) => {
    const item = elem as Continuous
    return `<w>${item.value}</w>`
  }
}
