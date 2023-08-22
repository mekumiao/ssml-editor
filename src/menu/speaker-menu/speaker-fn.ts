import { type IDomEditor } from '@wangeditor/editor'
import type { P } from '../../core/custom-types'
import { SlateTransforms, SlateRange } from '@wangeditor/editor'
import { bindClose, unpackVoid } from '../helper'
import { EMITTER_EVENT } from '../..'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import type { LabelValue } from '@/model'

export class SpeakerFn extends BaseFn {
  protected key: string = 'speaker'

  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public getValue(): string {
    return super.getValue()
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true

    const selection = this.selection()!
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '请选中文本')
      return true
    }

    const value = this.getValue()
    if (value.length != 1) return true

    if (!/^[\u4E00-\u9FA5]+$/gi.test(value)) {
      emitter.emit(EMITTER_EVENT.ERROR, '选中一个中文字符，并且有不能在其他语句之内')
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
      bgColor: 'speaker',
      children: [{ text: '' }]
    }

    SlateTransforms.delete(this.editor)
    SlateTransforms.insertNodes(this.editor, node)
    this.editor.move(1)

    bindClose<P>(this.editor, 'ssml-p', node.domId, (nodeEntity) => {
      unpackVoid(this.editor, nodeEntity, (elem) => elem.word)
    })
  }
}
