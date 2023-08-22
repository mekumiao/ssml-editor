import { SlateRange, type IDomEditor, SlateTransforms } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import type { LabelValue } from '@/model'
import type { Rhythm } from '@/core/rhythm'
import { findByDomId } from '../helper'

export class RhythmFn extends BaseFn {
  protected readonly key: string = 'rhythm'

  public constructor(editor: IDomEditor) {
    super(editor)
    editor.on('ssml-rhythm-close', RhythmFn.handleClose)
  }

  public static handleClose(editor: IDomEditor, item: Rhythm) {
    const nodeEntity = findByDomId<Rhythm>(editor, 'ssml-rhythm', item.domId)
    nodeEntity && SlateTransforms.delete(editor, { at: nodeEntity[1] })
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const selection = this.selection()!
    if (SlateRange.isExpanded(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '不能选中文本')
      return true
    }

    return false
  }

  public exec(opt: LabelValue) {
    if (this.isDisabled()) return

    const node: Rhythm = {
      type: 'ssml-rhythm',
      domId: this.genDomID(),
      time: opt.value,
      remark: opt.label,
      bgColor: 'rhythm',
      children: [{ text: '' }]
    }

    SlateTransforms.insertNodes(this.editor, node)
    this.editor.move(1)
  }
}
