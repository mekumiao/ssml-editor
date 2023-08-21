import { type IDomEditor } from '@wangeditor/editor'
import type { SayAs } from '../../core/custom-types'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { bindClose } from '../helper'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'

export class DigitalFn extends BaseFn {
  protected key: string = 'digital'

  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const selection = this.selection()!
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '请选择纯数字文本')
      return true
    }

    const value = SlateEditor.string(this.editor, selection)
    if (value.length <= 0) return true

    if (Number.isNaN(Number(value))) return true

    return false
  }

  public exec(opt: LabelValue) {
    if (this.isDisabled()) return

    const value = this.getValue()
    if (value == null) return

    const node: SayAs = {
      type: 'ssml-say-as',
      domId: this.genDomID(),
      interpretAs: opt.value,
      remark: opt.label,
      bgColor: 'digital',
      children: [{ text: value }]
    }

    SlateTransforms.delete(this.editor)
    SlateTransforms.insertNodes(this.editor, node)

    bindClose(this.editor, 'ssml-say-as', node.domId, (nodeEntity) => {
      SlateTransforms.unwrapNodes(this.editor, { at: nodeEntity[1] })
    })
  }
}
