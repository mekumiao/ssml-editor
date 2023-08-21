import type { App, Plugin } from 'vue'

import SpeakerMenu from './speaker-menu'
import ContinuousMenu from './continuous-menu'
import ReadMenu from './read-menu'
import DigitalMenu from './digital-menu'
import AliasMenu from './alias-menu'
import EnglishMenu from './english-menu'
import ChangespeedMenu from './changespeed-menu'
import RhythmMenu from './rhythm-menu'
import { SpecialMenu, SpecialDragBox } from './special-menu'
import MuteMenu from './mute-menu'
import { BgmMenu, BgmDragBox } from './bgm-menu'
import { SensitiveMenu, SensitiveDragBox } from './sensitive-menu'

export default {
  install: (app: App) => {
    app.component('SpeakerMenu', SpeakerMenu)
    app.component('ContinuousMenu', ContinuousMenu)
    app.component('ReadMenu', ReadMenu)
    app.component('DigitalMenu', DigitalMenu)
    app.component('AliasMenu', AliasMenu)
    app.component('EnglishMenu', EnglishMenu)
    app.component('ChangespeedMenu', ChangespeedMenu)
    app.component('RhythmMenu', RhythmMenu)
    app.component('SpecialMenu', SpecialMenu)
    app.component('SpecialDragBox', SpecialDragBox)
    app.component('MuteMenu', MuteMenu)
    app.component('BgmMenu', BgmMenu)
    app.component('BgmDragBox', BgmDragBox)
    app.component('SensitiveMenu', SensitiveMenu)
    app.component('SensitiveDragBox', SensitiveDragBox)
  }
} as Plugin

export {
  SpeakerMenu,
  ContinuousMenu,
  ReadMenu,
  DigitalMenu,
  AliasMenu,
  EnglishMenu,
  ChangespeedMenu,
  RhythmMenu,
  SpecialMenu,
  SpecialDragBox,
  MuteMenu,
  BgmMenu,
  BgmDragBox,
  SensitiveMenu,
  SensitiveDragBox
}

import './style.scss'
