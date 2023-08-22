import { SlateRange, type IDomEditor, SlateTransforms } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { EMITTER_EVENT } from '@/constant'
import type { Prosody } from '@/core/custom-types'
import { bindClose } from '../helper'
import { emitter } from '@/event-bus'
import type { LabelValue } from '@/model'

export class ChangespeedFn extends BaseFn {
  protected key: string = 'changespeed'

  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const selection = this.selection()
    if (selection == null) return true

    if (SlateRange.isCollapsed(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '请框选要变音的句子')
      return true
    }

    return false
  }

  exec(opt: LabelValue) {
    if (this.isDisabled()) return
    const value = this.getValue()
    if (value == null) return

    const node: Prosody = {
      type: 'ssml-prosody',
      domId: this.genDomID(),
      remark: opt.label,
      rate: opt.value,
      bgColor: 'changespeed',
      children: [{ text: value }]
    }

    SlateTransforms.delete(this.editor)
    SlateTransforms.insertNodes(this.editor, node)

    // SlateTransforms.wrapNodes(editor, node, { voids: false })

    bindClose<Prosody>(this.editor, 'ssml-prosody', node.domId, (nodeEntity) => {
      SlateTransforms.unwrapNodes(this.editor, { at: nodeEntity[1] })
    })
  }
}
