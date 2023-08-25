import { SlateTransforms, SlateRange, type IDomEditor } from '@wangeditor/editor'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import type { LabelValue } from '@/model'
import type { Break } from '@/core'

export class MuteFn extends BaseFn {
  protected readonly key: string = 'mute'

  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (!selection) return true
    if (SlateRange.isExpanded(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '不能选中文本')
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
      children: [{ text: '' }]
    }

    SlateTransforms.insertNodes(this.editor, node)
  }
}
