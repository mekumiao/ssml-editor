import { type IDomEditor } from '@wangeditor/editor'
import { SlateEditor, SlateRange } from '@wangeditor/editor'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import type { LabelValue } from '@/model'
import type { SayAs } from '@/core'

export class DigitalFn extends BaseFn {
  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (!selection) return true
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit('error', '请框选纯数字')
      return true
    }

    const value = SlateEditor.string(this.editor, selection)
    if (value.length <= 0) return true

    if (Number.isNaN(Number(value))) {
      emitter.emit('error', '请框选纯数字')
      return true
    }

    return false
  }

  public exec(opt: LabelValue) {
    this.editor.restoreSelection()
    if (this.isDisabled()) return

    const value = this.getValue()
    if (value == null) return

    const node: SayAs = {
      type: 'ssml-say-as',
      interpretAs: opt.value,
      remark: opt.label,
      children: [{ text: value }],
    }

    this.editor.insertNode(node)
  }
}
