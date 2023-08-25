import { type IDomEditor } from '@wangeditor/editor'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import type { LabelValue } from '@/model'
import type { Phoneme } from '@/core'

export class EnglishFn extends BaseFn {
  protected readonly key: string = 'english'

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
      emitter.emit(EMITTER_EVENT.ERROR, '请选择英文单词')
      return true
    }

    const value = SlateEditor.string(this.editor, selection)
    if (value.length <= 0) return true
    if (!/^[A-Za-z]+$/gi.test(value)) {
      emitter.emit(EMITTER_EVENT.ERROR, '请选择英文单词')
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
      ph: opt.value,
      remark: opt.label,
      children: [{ text: value }]
    }

    SlateTransforms.insertNodes(this.editor, node)
  }
}
