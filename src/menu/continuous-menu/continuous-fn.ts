import { type IDomEditor } from '@wangeditor/editor'
import type { W } from '../../core/custom-types'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { bindClose } from '../helper'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import { EMITTER_EVENT } from '@/constant'

export class ContinuousFn extends BaseFn {
  protected key: string = 'continuous'

  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const selection = this.selection()!
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '请选择多个中文字符或者多个多个英文单词')
      return true
    }

    const value = SlateEditor.string(this.editor, selection)
    if (value.length < 2) return true

    return false
  }

  public exec() {
    if (this.isDisabled()) return

    const value = this.getValue()
    if (value == null) return

    const node: W = {
      type: 'ssml-w',
      domId: this.genDomID(),
      children: [{ text: value }],
      remark: '连读',
      bgColor: 'continuous'
    }

    SlateTransforms.delete(this.editor)
    SlateTransforms.insertNodes(this.editor, node)

    bindClose(this.editor, 'ssml-w', node.domId, (nodeEntity) => {
      SlateTransforms.unwrapNodes(this.editor, { at: nodeEntity[1] })
    })
  }
}
