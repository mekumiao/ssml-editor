import { SlateRange, type IDomEditor, SlateTransforms } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { WANGEDITOR_EVENT } from '@/constant'
import type { CustomManagement } from '@/core'
import type { SubmitData } from './data'

export class ManagementFn extends BaseFn {
  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (selection == null) return true

    if (SlateRange.isCollapsed(selection)) {
      this.editor.emit(WANGEDITOR_EVENT.ERROR, '请框选句子')
      return true
    }

    return false
  }

  exec(opt: SubmitData) {
    this.editor.restoreSelection()
    if (this.isDisabled()) return
    const value = this.getValue()
    if (value == null) return

    const node: CustomManagement = {
      type: 'custom-management',
      remark: opt.label,
      name: opt.value,
      role: opt.role,
      style: opt.style,
      rate: opt.speed,
      pitch: opt.pitch,
      children: [{ text: value }],
    }

    SlateTransforms.insertNodes(this.editor, node)
  }
}
