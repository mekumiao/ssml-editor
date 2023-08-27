import { type IModuleConf } from '@wangeditor/editor'
import plugin from './plugin'
import renderElemConf from './render-elem'
import elemToHtmlConf from './elem-to-html'
import parseElemHtmlConf from './parse-elem-html'

export * from './custom-types'

export default <Partial<IModuleConf>>{
  editorPlugin: plugin,
  renderElems: [renderElemConf],
  elemsToHtml: [elemToHtmlConf],
  parseElemHtml: [parseElemHtmlConf],
}
