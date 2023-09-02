import { type IDomEditor } from '@wangeditor/editor'
import { SlateRange } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import type { LabelValue } from '@/model'
import type { Phoneme } from '@/core'
import { WANGEDITOR_EVENT } from '@/constant'

export class PinyinFn extends BaseFn {
  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public getValue(): string {
    return super.getValue()
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (!selection) return true
    if (SlateRange.isCollapsed(selection)) {
      this.editor.emit(WANGEDITOR_EVENT.ERROR, '请选中一个中文字符')
      return true
    }

    const value = this.getValue()
    if (value.length != 1) {
      this.editor.emit(WANGEDITOR_EVENT.ERROR, '请选中一个中文字符')
      return true
    }

    if (!/^[\u4E00-\u9FA5]$/gi.test(value)) {
      this.editor.emit(WANGEDITOR_EVENT.ERROR, '请选中一个中文字符')
      return true
    }

    return false
  }

  public exec(opt: LabelValue) {
    this.editor.restoreSelection()
    if (this.isDisabled()) return
    const value = this.getValue()
    if (value == null) return

    const node: Phoneme = {
      type: 'ssml-phoneme',
      alphabet: 'sapi',
      ph: opt.value,
      remark: opt.label,
      children: [{ text: value }],
    }

    this.editor.insertNode(node)
  }
}
