import { SlateTransforms, SlateRange, type IDomEditor } from '@wangeditor/editor'
import { findByDomId, unpackVoid } from '../helper'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import type { LabelValue } from '@/model'
import type { Read } from '@/core/read'

export class ReadFn extends BaseFn {
  protected readonly key: string = 'read'

  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public static handleClose(editor: IDomEditor, item: Read) {
    const nodeEntity = findByDomId<Read>(editor, 'ssml-read', item.domId)
    nodeEntity && unpackVoid(editor, nodeEntity, (elem) => elem.value)
  }

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

    const node: Read = {
      type: 'ssml-read',
      domId: this.genDomID(),
      phoneme: opt.value,
      remark: opt.label,
      value: value,
      bgColor: 'read',
      children: [{ text: '' }]
    }

    SlateTransforms.delete(this.editor)
    SlateTransforms.insertNodes(this.editor, node)
    this.editor.move(1)
  }
}
