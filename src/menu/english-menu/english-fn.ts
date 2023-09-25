import { type IDomEditor } from '@wangeditor/editor'
import { SlateEditor, SlateRange } from '@wangeditor/editor'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import type { LabelValue } from '@/model'
import type { Phoneme } from '@/core'

export class EnglishFn extends BaseFn {
  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public getValue(): string {
    return super.getValue()
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (!selection) return true
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit('warn', '请框选英文单词')
      return true
    }

    const value = SlateEditor.string(this.editor, selection)
    if (value.length <= 0) return true
    if (!/^[A-Za-z]+$/gi.test(value)) {
      emitter.emit('warn', '请框选英文单词')
      return true
    }

    return false
  }

  public exec(opt: LabelValue) {
    this.editor.restoreSelection()
    if (this.isDisabled()) return
    const value = this.getValue()
    if (value == null) return

    const node: Phoneme = {
      type: 'ssml-phoneme',
      alphabet: 'ipa',
      ph: opt.value,
      remark: opt.label,
      children: [{ text: value }],
    }

    this.editor.insertNode(node)
  }
}
