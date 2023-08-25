import { type IDomEditor } from '@wangeditor/editor'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import type { LabelValue } from '@/model'
import type { SayAs } from '@/core'

export class DigitalFn extends BaseFn {
  protected readonly key: string = 'digital'

  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (!selection) return true
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '请选择纯数字')
      return true
    }

    const value = SlateEditor.string(this.editor, selection)
    if (value.length <= 0) return true

    if (Number.isNaN(Number(value))) {
      emitter.emit(EMITTER_EVENT.ERROR, '请选择纯数字')
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
      children: [{ text: value }]
    }

    SlateTransforms.delete(this.editor)
    SlateTransforms.insertNodes(this.editor, node)
  }
}
