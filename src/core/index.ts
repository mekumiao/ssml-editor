import { type IModuleConf } from '@wangeditor/editor'
import { renderElems } from './render-elems'
import { elemToHtmls } from './elem-to-htmls'
import withSSML from './plugin'

export default {
  editorPlugin: withSSML,
  renderElems: renderElems,
  elemsToHtml: elemToHtmls
} as Partial<IModuleConf>

export * from './custom-types'

import './style.scss'
