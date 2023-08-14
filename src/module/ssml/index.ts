import { type IModuleConf } from '@wangeditor/editor'
import renderElems from './render-elems'
import withSetenceItem from './plugin'
import elemToHtmls from './elem-to-htmls'
import './style.scss'

const module: Partial<IModuleConf> = {
  editorPlugin: withSetenceItem,
  renderElems: renderElems,
  elemsToHtml: elemToHtmls
}

export default module
