import { SlateRange, type IDomEditor, SlateTransforms } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { WANGEDITOR_EVENT } from '@/constant'
import type { LabelValue } from '@/model'
import type { Break } from '@/core'

export class RhythmFn extends BaseFn {
  protected readonly key: string = 'rhythm'

  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (!selection) return true
    if (SlateRange.isExpanded(selection)) {
      this.editor.emit(WANGEDITOR_EVENT.ERROR, '不能选中文本')
      return true
    }

    return false
  }

  public exec(opt: LabelValue) {
    this.editor.restoreSelection()
    if (this.isDisabled()) return

    const node: Break = {
      type: 'ssml-break',
      strength: opt.value as any,
      remark: opt.label,
      children: [{ text: '' }]
    }

    SlateTransforms.insertNodes(this.editor, node)
  }
}
