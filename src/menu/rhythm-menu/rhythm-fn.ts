import { SlateRange, type IDomEditor } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { emitter } from '@/event-bus'
import type { LabelValue } from '@/model'
import type { Break } from '@/core'

export class RhythmFn extends BaseFn {
  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (!selection) return true
    if (SlateRange.isExpanded(selection)) {
      emitter.emit('warn', '不能框选文本')
      return true
    }

    return false
  }

  public exec(opt: LabelValue) {
    this.editor.restoreSelection()
    if (this.isDisabled()) return

    const node: Break = {
      type: 'ssml-break',
      strength: opt.value as any,
      remark: opt.label,
      children: [{ text: '' }],
    }

    this.editor.insertNode(node)
  }
}
