import type { Break } from '../../core/custom-types'
import { SlateTransforms, SlateRange } from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import { bindClose } from '../helper'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'

function genDomID(): string {
  return genRandomStr('w-e-dom-mute')
}

export class MuteFn extends BaseFn {
  protected key: string = 'mute'

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

    const node: Break = {
      type: 'ssml-break',
      domId: genDomID(),
      time: opt.value,
      remark: opt.label,
      bgColor: 'mute',
      children: [{ text: '' }]
    }

    SlateTransforms.insertNodes(this.editor, node)
    this.editor.move(1)

    bindClose(this.editor, 'ssml-break', node.domId, (nodeEntity) => {
      SlateTransforms.delete(this.editor, { at: nodeEntity[1] })
    })
  }
}
