import type { App, Plugin } from 'vue'

import { PinyinMenu } from './pinyin-menu'
import { ContinuousMenu } from './continuous-menu'
import { ReadMenu } from './read-menu'
import { DigitalMenu } from './digital-menu'
import { AliasMenu } from './alias-menu'
import { EnglishMenu } from './english-menu'
import { ChangespeedMenu } from './changespeed-menu'
import { RhythmMenu } from './rhythm-menu'
import { SpecialMenu } from './special-menu'
import { MuteMenu } from './mute-menu'
import { BgmMenu } from './bgm-menu'
import { SensitiveMenu } from './sensitive-menu'
import { ManagementMenu } from './management-menu'
import { ConversionMenu } from './conversion-menu'
import { TryPlay } from './try-play'

export default {
  install: (app: App) => {
    app.component('PinyinMenu', PinyinMenu)
    app.component('ContinuousMenu', ContinuousMenu)
    app.component('ReadMenu', ReadMenu)
    app.component('DigitalMenu', DigitalMenu)
    app.component('AliasMenu', AliasMenu)
    app.component('EnglishMenu', EnglishMenu)
    app.component('ChangespeedMenu', ChangespeedMenu)
    app.component('RhythmMenu', RhythmMenu)
    app.component('SpecialMenu', SpecialMenu)
    app.component('MuteMenu', MuteMenu)
    app.component('BgmMenu', BgmMenu)
    app.component('SensitiveMenu', SensitiveMenu)
    app.component('ManagementMenu', ManagementMenu)
    app.component('ConversionMenu', ConversionMenu)
    app.component('TryPlay', TryPlay)
  }
} as Plugin

export {
  PinyinMenu,
  ContinuousMenu,
  ReadMenu,
  DigitalMenu,
  AliasMenu,
  EnglishMenu,
  ChangespeedMenu,
  RhythmMenu,
  SpecialMenu,
  MuteMenu,
  BgmMenu,
  SensitiveMenu,
  ManagementMenu,
  ConversionMenu,
  TryPlay
}

import './style.scss'
