import { type IModuleConf } from '@wangeditor/editor'
import { renderElems } from './render-elems'
import elemsToHtml from './elems-to-html'
import parseElemsHtml from './parse-elems-html'
import withSSML from './plugin'

export default {
  editorPlugin: withSSML,
  renderElems: renderElems,
  elemsToHtml: elemsToHtml,
  parseElemsHtml: parseElemsHtml
} as Partial<IModuleConf>

export * from './custom-types'

import './style.scss'
