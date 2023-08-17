import { type IModuleConf } from '@wangeditor/editor'
import { renderElems } from './render-elems'
import { elemToHtmls } from './elem-to-htmls'
import withSSML from './plugin'
export type { IdText } from './custom-types'

const module: Partial<IModuleConf> = {
  editorPlugin: withSSML,
  renderElems: renderElems,
  elemsToHtml: elemToHtmls
}

export default module

import './style.scss'
