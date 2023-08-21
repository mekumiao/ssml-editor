import { type IDomEditor } from '@wangeditor/editor'
import type { P } from '../../core/custom-types'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { bindClose, unpackVoid } from '../helper'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'

export class EnglishEn extends BaseFn {
  protected key: string = 'english'

  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public getValue(): string {
    return super.getValue()
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const selection = this.selection()!
    if (SlateRange.isCollapsed(selection)) return true

    const value = SlateEditor.string(this.editor, selection)
    if (value.length <= 0) return true
    if (!/^[A-Za-z]+$/gi.test(value)) {
      emitter.emit(EMITTER_EVENT.ERROR, '请选择英文单词')
      return true
    }

    return false
  }

  public exec(opt: LabelValue) {
    if (this.isDisabled()) return
    const value = this.getValue()
    if (value == null) return

    const node: P = {
      type: 'ssml-p',
      domId: this.genDomID(),
      word: value,
      phoneme: opt.value,
      remark: opt.label,
      bgColor: 'english',
      children: [{ text: '' }]
    }

    SlateTransforms.delete(this.editor)
    SlateTransforms.insertNodes(this.editor, node)
    this.editor.move(1)

    bindClose<P>(this.editor, 'ssml-p', node.domId, (nodeEntity) =>
      unpackVoid(this.editor, nodeEntity, (elem) => elem.word)
    )
  }
}
