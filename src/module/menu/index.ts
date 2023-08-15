import { ContinuousFn } from './continuous-menu'
import { PolyphoneFn } from './polyphone-menu'
import { SayAsFn } from './say-as-menu'
import type { SayAs } from '../custom-types'
import type { IDomEditor } from '@wangeditor/editor'

const continuousFn = new ContinuousFn()
const polyphoneFn = new PolyphoneFn()
const sayAsFn = new SayAsFn()

export function handleContinuous(editor: IDomEditor) {
  if (continuousFn.isDisabled(editor)) return
  continuousFn.exec(editor)
}
export function handlePolyphone(editor: IDomEditor) {
  if (polyphoneFn.isDisabled(editor)) return
  polyphoneFn.exec(editor)
}
export function handleSayAs(editor: IDomEditor, interpret: SayAs['interpret']) {
  if (sayAsFn.isDisabled(editor)) return
  sayAsFn.exec(editor, interpret)
}
