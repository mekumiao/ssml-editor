import { type IDomEditor } from '@wangeditor/editor'
import { SlateEditor, SlateRange } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { WANGEDITOR_EVENT } from '@/constant'
import type { Prosody } from '@/core'
// import type { MoyinW } from '@/core/moyin-w'

export class ContinuousFn extends BaseFn {
  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (!selection) return true
    if (SlateRange.isCollapsed(selection)) {
      this.editor.emit(WANGEDITOR_EVENT.ERROR, '请框选要连读的词或句子')
      return true
    }

    const value = SlateEditor.string(this.editor, selection)
    if (value.length < 2) return true

    return false
  }

  public exec() {
    if (this.isDisabled()) return

    const value = this.getValue()
    if (value == null) return

    // 使用 moyin api 时, 取消注释
    // const node: MoyinW = {
    //   type: 'moyin-w',
    //   remark: '连读',
    //   children: [{ text: value }],
    // }

    const node: Prosody = {
      type: 'ssml-prosody',
      rate: 'medium',
      remark: '连读',
      children: [{ text: value }],
    }

    this.editor.insertNode(node)
  }
}
