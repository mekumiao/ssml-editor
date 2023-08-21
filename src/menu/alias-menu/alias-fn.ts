import { SlateRange, type IDomEditor, SlateEditor, SlateTransforms } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import type { Sub } from '@/core/custom-types'
import { bindClose, unpackVoid } from '../helper'

export class AliasFn extends BaseFn {
  protected key: string = 'alias'

  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true

    const selection = this.selection()!
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '选中一个中文字符，并且有不能在其他语句之内')
      return true
    }

    const value = SlateEditor.string(this.editor, selection)
    if (value.length <= 0) return true

    return false
  }

  public exec(opt: LabelValue) {
    if (this.isDisabled()) return

    const value = this.getValue()
    if (value == null) return

    const node: Sub = {
      type: 'ssml-sub',
      domId: this.genDomID(),
      remark: `(${opt.label})`,
      alias: opt.value,
      value: value,
      bgColor: 'alias',
      children: [{ text: '' }]
    }

    SlateTransforms.delete(this.editor)
    SlateTransforms.insertNodes(this.editor, node)

    bindClose<Sub>(this.editor, 'ssml-sub', node.domId, (nodeEntity) =>
      unpackVoid(this.editor, nodeEntity, (elem) => elem.value)
    )
  }
}
