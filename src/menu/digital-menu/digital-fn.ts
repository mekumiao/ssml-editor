import { type IDomEditor } from '@wangeditor/editor'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import type { LabelValue } from '@/model'
import type { Digital } from '@/core/digital'
import { findByDomId, unpackVoid } from '../helper'

export class DigitalFn extends BaseFn {
  protected readonly key: string = 'digital'

  public constructor(editor: IDomEditor) {
    super(editor)
    editor.on('ssml-digital-close', DigitalFn.handleClose)
  }

  public static handleClose(editor: IDomEditor, item: Digital) {
    const nodeEntity = findByDomId<Digital>(editor, 'ssml-digital', item.domId)
    nodeEntity && unpackVoid<Digital>(editor, nodeEntity, (elem) => elem.value)
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

    const node: Digital = {
      type: 'ssml-digital',
      domId: this.genDomID(),
      interpretAs: opt.value,
      remark: opt.label,
      value: value,
      bgColor: 'digital',
      children: [{ text: '' }]
    }

    SlateTransforms.delete(this.editor)
    SlateTransforms.insertNodes(this.editor, node)
    this.editor.move(1)
  }
}
