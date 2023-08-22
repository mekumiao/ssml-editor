import { SlateRange, type IDomEditor, SlateTransforms } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import type { LabelValue } from '@/model'
import type { Changespeed } from '@/core/changespeed'
import { findByDomId } from '../helper'

export class ChangespeedFn extends BaseFn {
  protected readonly key: string= 'changespeed'

  public constructor(editor: IDomEditor) {
    super(editor)
    editor.on('ssml-changespeed-close', ChangespeedFn.handleClose)
  }

  public static handleClose(editor: IDomEditor, item: Changespeed) {
    const nodeEntity = findByDomId<Changespeed>(editor, 'ssml-changespeed', item.domId)
    nodeEntity && SlateTransforms.unwrapNodes(editor, { at: nodeEntity[1] })
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const selection = this.selection()
    if (selection == null) return true

    if (SlateRange.isCollapsed(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '请框选要变速的句子')
      return true
    }

    return false
  }

  exec(opt: LabelValue) {
    if (this.isDisabled()) return
    const value = this.getValue()
    if (value == null) return

    const node: Changespeed = {
      type: 'ssml-changespeed',
      domId: this.genDomID(),
      remark: opt.label,
      rate: opt.value,
      bgColor: 'changespeed',
      children: [{ text: value }]
    }

    SlateTransforms.delete(this.editor)
    SlateTransforms.insertNodes(this.editor, node)
    // this.editor.move(1)
  }
}
