import type { SlateElement } from '@wangeditor/editor'
import type { Alias } from './custom-types'

export default {
  type: 'ssml-alias',
  elemToHtml: (elem: SlateElement) => {
    const { alias, value } = elem as Alias
    return `<sub alias="${alias}">${value}</sub>`
  }
}
