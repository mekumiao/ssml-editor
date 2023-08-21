import { type IDomEditor } from '@wangeditor/editor'
import { SlateTransforms, SlateRange } from '@wangeditor/editor'
import { playSound } from '@/utils'
import type { Audio } from '@/core'
import { bindClose, bindPlay } from '../helper'
import { emitter } from '@/event-bus'
import { EMITTER_EVENT } from '@/constant'
import BaseFn from '../base-fn'

// 音效功能
export class SpecialFn extends BaseFn {
  protected key: string = 'special'

  public constructor(editor: IDomEditor) {
    super(editor)
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

    const node: Audio = {
      type: 'ssml-audio',
      domId: this.genDomID(),
      src: opt.value,
      remark: opt.label,
      bgColor: 'special',
      children: [{ text: '' }]
    }

    SlateTransforms.insertNodes(this.editor, node)
    this.editor.move(1)

    bindClose<Audio>(this.editor, 'ssml-audio', node.domId, (nodeEntity) =>
      SlateTransforms.delete(this.editor, { at: nodeEntity[1] })
    )

    bindPlay<Audio>(this.editor, 'ssml-audio', node.domId, (nodeEntity) =>
      playSound(nodeEntity[0].src)
    )
  }
}
