import { SlateRange, type IDomEditor } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { emitter } from '@/event-bus'
import type { LabelValue } from '@/model'
import type { Prosody } from '@/core'

export class ChangespeedFn extends BaseFn {
  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (selection == null) return true

    if (SlateRange.isCollapsed(selection)) {
      emitter.emit('error', '请框选要变速的句子')
      return true
    }

    return false
  }

  exec(opt: LabelValue) {
    this.editor.restoreSelection()
    if (this.isDisabled()) return
    const value = this.getValue()
    if (value == null) return

    const node: Prosody = {
      type: 'ssml-prosody',
      remark: opt.label,
      rate: opt.value,
      children: [{ text: value }],
    }

    this.editor.insertNode(node)
  }
}
