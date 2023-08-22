import { SlateTransforms, SlateRange, type IDomEditor } from '@wangeditor/editor'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import type { LabelValue } from '@/model'
import type { Mute } from '@/core/mute'
import { findByDomId } from '../helper'

export class MuteFn extends BaseFn {
  protected readonly key: string= 'mute'

  public constructor(editor: IDomEditor) {
    super(editor)
    editor.on('ssml-mute-close', MuteFn.handleClose)
  }

  public static handleClose(editor: IDomEditor, item: Mute) {
    const nodeEntity = findByDomId<Mute>(editor, 'ssml-mute', item.domId)
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

    const node: Mute = {
      type: 'ssml-mute',
      domId: this.genDomID(),
      time: opt.value,
      remark: opt.label,
      bgColor: 'mute',
      children: [{ text: '' }]
    }

    SlateTransforms.insertNodes(this.editor, node)
    this.editor.move(1)
  }
}
