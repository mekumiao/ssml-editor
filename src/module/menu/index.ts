import { ContinuousFn } from './continuous-menu'
import { SpeakerFn } from './speaker-menu'
import { ReadFn } from './read-menu'
import type { Read } from '../custom-types'
import type { IDomEditor } from '@wangeditor/editor'

const continuousFn = new ContinuousFn()
const speakerFn = new SpeakerFn()
const sayAsFn = new ReadFn()

export function handleContinuous(editor: IDomEditor) {
  if (continuousFn.isDisabled(editor)) return
  continuousFn.exec(editor)
}
export function handleSpeaker(editor: IDomEditor) {
  if (speakerFn.isDisabled(editor)) return
  speakerFn.exec(editor)
}
export function handleRead(editor: IDomEditor, selecte: Read['selecte']) {
  if (sayAsFn.isDisabled(editor)) return
  sayAsFn.exec(editor, selecte)
}
