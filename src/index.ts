import type { App, Plugin } from 'vue'
import { Boot } from '@wangeditor/editor'

import EditorComponentsPlugin from './components'
import EditorMenuPlugin from './menu'
import EditorView from './view'
import { EMITTER_EVENT } from './constant'
import { emitter } from './event-bus'
import { type SSMLEditorConfig, provideGlobalConfig } from './config'
import {
  AliasModule,
  ChangespeedModule,
  ContinuousModule,
  DigitalModule,
  EnglishModule,
  MuteModule,
  ReadModule,
  RhythmModule,
  SpeakerModule,
  SpecialModule,
  SpeakModule,
  GlobalPlugin
} from './core'

export * from './constant'
export * from './model'
export * from './config'

export default {
  install(app: App, config?: SSMLEditorConfig) {
    const globalEditorConfig = provideGlobalConfig(app.provide, config)
    emitter.on(EMITTER_EVENT.ERROR, globalEditorConfig.handleError)

    Boot.registerModule(AliasModule)
    Boot.registerModule(ChangespeedModule)
    Boot.registerModule(ContinuousModule)
    Boot.registerModule(DigitalModule)
    Boot.registerModule(EnglishModule)
    Boot.registerModule(MuteModule)
    Boot.registerModule(ReadModule)
    Boot.registerModule(RhythmModule)
    Boot.registerModule(SpeakerModule)
    Boot.registerModule(SpecialModule)
    Boot.registerModule(SpeakModule)
    Boot.registerModule(GlobalPlugin)

    app.use(EditorComponentsPlugin)
    app.use(EditorMenuPlugin)
    app.use(EditorView)
  }
} as Plugin

import './assets/main.scss'
