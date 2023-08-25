import { SlateTransforms, SlateRange, type IDomEditor } from '@wangeditor/editor'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import type { LabelValue } from '@/model'
import type { Emphasis } from '@/core'

export class ReadFn extends BaseFn {
  protected readonly key: string = 'read'

  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (!selection) return true
    if (selection == null) return true
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '请先选择文本')
      return true
    }

    return false
  }

  exec(opt: LabelValue) {
    this.editor.restoreSelection()
    if (this.isDisabled()) return
    const value = this.getValue()
    if (value == null) return

    const node: Emphasis = {
      type: 'ssml-emphasis',
      level: opt.value as any,
      remark: opt.label,
      children: [{ text: value }]
    }

    SlateTransforms.insertNodes(this.editor, node)
  }
}
