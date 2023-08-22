import type { IDomEditor } from '@wangeditor/editor'
import { ReadFn } from '@/menu/read-menu/read-fn'
import { AliasFn } from '@/menu/alias-menu/alias-fn'
import { ContinuousFn } from '@/menu/continuous-menu/continuous-fn'
import { DigitalFn } from '@/menu/digital-menu/digital-fn'
import { EnglishFn } from '@/menu/english-menu/english-fn'
import { MuteFn } from '@/menu/mute-menu/mute-fn'
import { RhythmFn } from '@/menu/rhythm-menu/rhythm-fn'
import { SpeakerFn } from '@/menu/speaker-menu/speaker-fn'
import { SpecialFn } from '@/menu/special-menu/special-fn'
import { ChangespeedFn } from '@/menu/changespeed-menu/changespeed-fn'

export function bind(editor: IDomEditor): void {
  editor.on('ssml-alias-close', AliasFn.handleClose)
  editor.on('ssml-changespeed-close', ChangespeedFn.handleClose)
  editor.on('ssml-continuous-close', ContinuousFn.handleClose)
  editor.on('ssml-digital-close', DigitalFn.handleClose)
  editor.on('ssml-english-close', EnglishFn.handleClose)
  editor.on('ssml-mute-close', MuteFn.handleClose)
  editor.on('ssml-read-close', ReadFn.handleClose)
  editor.on('ssml-rhythm-close', RhythmFn.handleClose)
  editor.on('ssml-speaker-close', SpeakerFn.handleClose)
  editor.on('ssml-special-close', SpecialFn.handleClose)
}
