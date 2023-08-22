import { type IDomEditor } from '@wangeditor/editor'
import { SlateTransforms, SlateRange } from '@wangeditor/editor'
import { findByDomId, unpackVoid } from '../helper'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import type { LabelValue } from '@/model'
import type { Speaker } from '@/core/speaker'
import { EMITTER_EVENT } from '@/constant'

export class SpeakerFn extends BaseFn {
  protected readonly key: string = 'speaker'

  public constructor(editor: IDomEditor) {
    super(editor)
    editor.on('ssml-speaker-close', SpeakerFn.handleClose)
  }

  public static handleClose(editor: IDomEditor, value: Speaker) {
    const nodeEntity = findByDomId<Speaker>(editor, 'ssml-speaker', value.domId)
    nodeEntity && unpackVoid(editor, nodeEntity, (elem) => elem.word)
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

    const node: Speaker = {
      type: 'ssml-speaker',
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
  }
}
