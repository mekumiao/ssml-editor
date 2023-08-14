import { type IModuleConf } from '@wangeditor/editor'
import { renderContinuousConf, renderPlyphoneConf } from './render-elem'
import withSetenceItem from './plugin'
import { insertPolyphoneConf, insertContinuousConf } from './menu'

const module: Partial<IModuleConf> = {
  editorPlugin: withSetenceItem,
  renderElems: [renderContinuousConf, renderPlyphoneConf],
  menus: [insertPolyphoneConf, insertContinuousConf]
}

export default module
