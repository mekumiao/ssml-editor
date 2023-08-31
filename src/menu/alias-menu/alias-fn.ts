import { SlateRange, type IDomEditor } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { WANGEDITOR_EVENT } from '@/constant'
import type { LabelValue } from '@/model'
import type { Sub } from '@/core'

export class AliasFn extends BaseFn {
  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (selection == null) return true
    if (SlateRange.isCollapsed(selection)) {
      this.editor.emit(WANGEDITOR_EVENT.ERROR, '选中一个中文字符，并且有不能在其他语句之内')
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
      children: [{ text: value }],
    }

    this.editor.insertNode(node)
  }
}
