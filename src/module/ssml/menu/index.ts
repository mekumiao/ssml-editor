import { ContinuousFn } from './continuous-menu'
import { PolyphoneFn } from './polyphone-menu'
import { SayAsFn } from './say-as-menu'
import type { SayAs } from '../custom-types'

const continuousFn = new ContinuousFn()
const polyphoneFn = new PolyphoneFn()
const sayAsFn = new SayAsFn()

export function handleContinuous() {
  const editor = window.editor
  if (continuousFn.isDisabled(editor)) return
  continuousFn.exec(editor)
}
export function handlePolyphone() {
  const editor = window.editor
  if (polyphoneFn.isDisabled(editor)) return
  polyphoneFn.exec(editor)
}
export function handleSayAs(interpret: SayAs['interpret']) {
  const editor = window.editor
  if (sayAsFn.isDisabled(editor)) return
  sayAsFn.exec(editor, interpret)
}
