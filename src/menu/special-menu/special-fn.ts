import { type IDomEditor } from '@wangeditor/editor'
import { SlateTransforms, SlateRange } from '@wangeditor/editor'
import { playSound } from '@/utils'
import { emitter } from '@/event-bus'
import { EMITTER_EVENT } from '@/constant'
import BaseFn from '../base-fn'
import type { LabelValue } from '@/model'
import type { Special } from '@/core/special'
import { findByDomId } from '../helper'

// 音效功能
export class SpecialFn extends BaseFn {
  protected readonly key: string = 'special'

  public constructor(editor: IDomEditor) {
    super(editor)
    editor.on('ssml-special-close', SpecialFn.handleClose)
    editor.on('ssml-special-play', SpecialFn.handlePlay)
  }

  public static handleClose(editor: IDomEditor, item: Special) {
    const nodeEntity = findByDomId<Special>(editor, 'ssml-special', item.domId)
    nodeEntity && SlateTransforms.delete(editor, { at: nodeEntity[1] })
  }

  private static handlePlay(_editor: IDomEditor, item: Special) {
    playSound(item.src)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const selection = this.selection()!
    if (SlateRange.isExpanded(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '不能框选文字')
      return true
    }
    return false
  }

  exec(opt: LabelValue) {
    if (this.isDisabled()) return

    const value = this.getValue()
    if (value == null) return

    const node: Special = {
      type: 'ssml-special',
      domId: this.genDomID(),
      src: opt.value,
      remark: opt.label,
      bgColor: 'special',
      children: [{ text: '' }]
    }

    SlateTransforms.insertNodes(this.editor, node)
    this.editor.move(1)
  }
}
