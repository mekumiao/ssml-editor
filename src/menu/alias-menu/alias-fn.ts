import { SlateRange, type IDomEditor, SlateTransforms } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import type { LabelValue } from '@/model'
import type { Sub } from '@/core'

export class AliasFn extends BaseFn {
  protected readonly key: string = 'alias'

  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (selection == null) return true
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '选中一个中文字符，并且有不能在其他语句之内')
      return true
    }

    const value = this.getValue()
    if (value.length <= 0) return true

    return false
  }

  public exec(opt: LabelValue) {
    this.editor.restoreSelection()
    if (this.isDisabled()) return

    const value = this.getValue()
    if (value == null) return

    const node: Sub = {
      type: 'ssml-sub',
      remark: opt.value,
      alias: opt.value,
      children: [{ text: value }]
    }

    SlateTransforms.insertNodes(this.editor, node)
  }
}
