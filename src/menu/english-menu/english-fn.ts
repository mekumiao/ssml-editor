import { type IDomEditor } from '@wangeditor/editor'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { findByDomId, unpackVoid } from '../helper'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import type { LabelValue } from '@/model'
import type { English } from '@/core/english'

export class EnglishFn extends BaseFn {
  protected readonly key: string = 'english'

  public constructor(editor: IDomEditor) {
    super(editor)
    editor.on('ssml-english-close', EnglishFn.handleClose)
  }

  public static handleClose(editor: IDomEditor, item: English) {
    const nodeEntity = findByDomId<English>(editor, 'ssml-english', item.domId)
    nodeEntity && unpackVoid(editor, nodeEntity, (elem) => elem.word)
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

    const node: English = {
      type: 'ssml-english',
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
  }
}
