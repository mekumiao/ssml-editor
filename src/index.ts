import type { App } from 'vue'
import { BarButton, BarInput } from './components'
import {
  SpeakerMenu,
  ContinuousMenu,
  ReadMenu,
  DigitalMenu,
  AliasMenu,
  EnglishMenu,
  ChangespeedMenu,
  RhythmMenu,
  SpecialMenu,
  MuteMenu
} from './menu'

export { default as SSMLModule, type IdText } from './core'

export const EditorMenuPlugin = {
  install: (app: App) => {
    app.component('BarButton', BarButton)
    app.component('BarInput', BarInput)

    app.component('SpeakerMenu', SpeakerMenu)
    app.component('ContinuousMenu', ContinuousMenu)
    app.component('ReadMenu', ReadMenu)
    app.component('DigitalMenu', DigitalMenu)
    app.component('AliasMenu', AliasMenu)
    app.component('EnglishMenu', EnglishMenu)
    app.component('ChangespeedMenu', ChangespeedMenu)
    app.component('RhythmMenu', RhythmMenu)
    app.component('SpecialMenu', SpecialMenu)
    app.component('MuteMenu', MuteMenu)
  }
}

export {
  // components
  BarButton,
  BarInput,

  // menu
  SpeakerMenu,
  ContinuousMenu,
  ReadMenu,
  DigitalMenu,
  AliasMenu,
  EnglishMenu,
  ChangespeedMenu,
  RhythmMenu,
  SpecialMenu,
  MuteMenu
}

import './assets/main.scss'
