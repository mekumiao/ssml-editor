import type { W } from '../../core/custom-types'
import { SlateTransforms, SlateRange } from '@wangeditor/editor'
import { bindClose, unpackVoid } from '../helper'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'

export class ReadFn extends BaseFn {
  protected key: string = 'read'

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const selection = this.selection()
    if (selection == null) return true
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '请先选择文本')
      return true
    }

    return false
  }

  exec(opt: LabelValue) {
    if (this.isDisabled()) return
    const value = this.getValue()
    if (value == null) return

    const node: W = {
      type: 'ssml-w',
      domId: this.genDomID(),
      phoneme: opt.value,
      remark: opt.label,
      value: value,
      bgColor: 'read',
      children: [{ text: value }]
    }

    SlateTransforms.delete(this.editor)
    SlateTransforms.insertNodes(this.editor, node)

    bindClose<W>(this.editor, 'ssml-w', node.domId, (nodeEntity) =>
      unpackVoid(this.editor, nodeEntity, () => value)
    )
  }
}
