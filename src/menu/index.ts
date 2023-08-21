import type { App, Plugin } from 'vue'

import SpeakerMenu from './speaker-menu/speaker-menu'
import ContinuousMenu from './continuous-menu'
import ReadMenu from './read-menu'
import DigitalMenu from './digital-menu'
import AliasMenu from './alias-menu'
import EnglishMenu from './english-menu'
import ChangespeedMenu from './changespeed-menu/changespeed-menu'
import RhythmMenu from './rhythm-menu'
import { SpecialMenu, SpecialDragBox } from './special-menu'
import MuteMenu from './mute-menu'
import { BgmMenu, BgmDragBox } from './bgm-menu'
import { SensitiveMenu, SensitiveDragBox } from './sensitive-menu'
import { ManagementMenu, ManagementDragBox } from './management-menu'
import { ConversionMenu, ConversionDragBox } from './conversion-menu'
import { TryPlay } from './try-play'

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
    app.component('ManagementMenu', ManagementMenu)
    app.component('ManagementDragBox', ManagementDragBox)
    app.component('ConversionMenu', ConversionMenu)
    app.component('ConversionDragBox', ConversionDragBox)
    app.component('TryPlay', TryPlay)
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
  SensitiveDragBox,
  ManagementMenu,
  ManagementDragBox,
  ConversionMenu,
  ConversionDragBox,
  TryPlay
}

import './style.scss'
