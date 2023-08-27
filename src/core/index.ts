import { Boot } from '@wangeditor/editor'
import AudioModule from './audio'
import BreakModule from './break'
import EmphasisModule from './emphasis'
import MsttsExpressAsModule from './mstts-express-as'
import PModule from './p'
import PhonemeModule from './phoneme'
import ProsodyModule from './prosody'
import SModule from './s'
import SayAsModule from './say-as'
import SubModule from './sub'
import VoiceModule from './voice'

import plugin from './plugin'

export * from './custom-types'
export * from './serialize'

export default {
  install() {
    Boot.registerModule(AudioModule)
    Boot.registerModule(BreakModule)
    Boot.registerModule(EmphasisModule)
    Boot.registerModule(MsttsExpressAsModule)
    Boot.registerModule(PModule)
    Boot.registerModule(PhonemeModule)
    Boot.registerModule(ProsodyModule)
    Boot.registerModule(SModule)
    Boot.registerModule(SayAsModule)
    Boot.registerModule(SubModule)
    Boot.registerModule(VoiceModule)
    // 全局插件
    Boot.registerPlugin(plugin)
  },
}

import './style.scss'
