import { type IModuleConf } from '@wangeditor/editor'
import plugin from './plugin'
import renderElemConf from './render-elem'
import elemToHtmlConf from './elem-to-html'

export * from './custom-types'

export default {
  editorPlugin: plugin,
  renderElems: [renderElemConf],
  elemsToHtml: [elemToHtmlConf]
} as Partial<IModuleConf>
