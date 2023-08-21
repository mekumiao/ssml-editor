import { SlateRange, type IDomEditor, SlateTransforms } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import type { Break } from '@/core/custom-types'
import { bindClose } from '../helper'

export class RhythmFn extends BaseFn {
  protected key: string = 'rhythm'

  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const selection = this.selection()!
    if (SlateRange.isExpanded(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '不能选中文本')
      return true
    }

    return false
  }

  public exec(opt: LabelValue) {
    if (this.isDisabled()) return

    const node: Break = {
      type: 'ssml-break',
      domId: this.genDomID(),
      time: opt.value,
      remark: opt.label,
      bgColor: 'rhythm',
      children: [{ text: '' }]
    }

    SlateTransforms.insertNodes(this.editor, node)
    this.editor.move(1)

    bindClose(this.editor, 'ssml-break', node.domId, (nodeEntity) => {
      SlateTransforms.delete(this.editor, { at: nodeEntity[1] })
    })
  }
}
