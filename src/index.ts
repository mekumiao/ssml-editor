import type { App } from 'vue'
import {
  EditBarButton,
  SpeakerMenu,
  ContinuousMenu,
  ReadMenu,
  DigitalMenu,
  AliasMenu,
  EnglishMenu,
  ChangespeedMenu,
  RhythmMenu
} from './menu'

export { default as SSMLModule, type IdText } from './core'

export const EditorMenuPlugin = {
  install: (app: App) => {
    app.component('EditBarButton', EditBarButton)
    app.component('SpeakerMenu', SpeakerMenu)
    app.component('ContinuousMenu', ContinuousMenu)
    app.component('ReadMenu', ReadMenu)
    app.component('DigitalMenu', DigitalMenu)
    app.component('AliasMenu', AliasMenu)
    app.component('EnglishMenu', EnglishMenu)
    app.component('ChangespeedMenu', ChangespeedMenu)
    app.component('RhythmMenu', RhythmMenu)
  }
}

export {
  SpeakerMenu,
  ContinuousMenu,
  ReadMenu,
  DigitalMenu,
  AliasMenu,
  EnglishMenu,
  ChangespeedMenu,
  RhythmMenu
}

import './assets/main.scss'
