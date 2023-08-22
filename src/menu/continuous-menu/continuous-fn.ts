import { type IDomEditor } from '@wangeditor/editor'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import { EMITTER_EVENT } from '@/constant'
import type { Continuous } from '@/core/continuous'
import { findByDomId, unpackVoid } from '../helper'

export class ContinuousFn extends BaseFn {
  protected readonly key: string = 'continuous'

  public constructor(editor: IDomEditor) {
    super(editor)
    editor.on('ssml-continuous-close', ContinuousFn.handleClose)
  }

  public static handleClose(editor: IDomEditor, item: Continuous) {
    const nodeEntity = findByDomId<Continuous>(editor, 'ssml-continuous', item.domId)
    nodeEntity && unpackVoid<Continuous>(editor, nodeEntity, (elem) => elem.value)
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

    const node: Continuous = {
      type: 'ssml-continuous',
      domId: this.genDomID(),
      children: [{ text: '' }],
      remark: '连读',
      value: value,
      bgColor: 'continuous'
    }

    SlateTransforms.delete(this.editor)
    SlateTransforms.insertNodes(this.editor, node)
    this.editor.move(1)
  }
}
