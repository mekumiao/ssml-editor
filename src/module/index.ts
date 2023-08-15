import { type IModuleConf } from '@wangeditor/editor'
import { renderElems } from './render-elems'
import { elemToHtmls } from './elem-to-htmls'
import withSSML from './plugin'
import './style.scss'

const module: Partial<IModuleConf> = {
  editorPlugin: withSSML,
  renderElems: renderElems,
  elemsToHtml: elemToHtmls
}

export default module
