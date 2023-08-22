import { type IModuleConf } from '@wangeditor/editor'
import plugin from './plugin'

export * from './custom-types'

export default {
  editorPlugin: plugin
} as Partial<IModuleConf>
