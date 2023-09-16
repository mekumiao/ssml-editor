import { SlateRange, type IDomEditor } from '@wangeditor/editor'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import type { LabelValue } from '@/model'
import type { Break } from '@/core'

export class MuteFn extends BaseFn {
  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (!selection) return true
    if (SlateRange.isExpanded(selection)) {
      emitter.emit('error', '不能框选文本')
      return true
    }

    return false
  }

  public exec(opt: LabelValue) {
    this.editor.restoreSelection()
    if (this.isDisabled()) return

    const node: Break = {
      type: 'ssml-break',
      time: opt.value,
      remark: opt.label,
      children: [{ text: '' }],
    }

    this.editor.insertNode(node)
  }
}
