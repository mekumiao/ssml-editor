import { type IDomEditor } from '@wangeditor/editor'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import { EMITTER_EVENT } from '@/constant'
import type { W } from '@/core'

export class ContinuousFn extends BaseFn {
  protected readonly key: string = 'continuous'

  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (!selection) return true
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '请选择多个中文字符或者多个多个英文单词')
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

    const node: W = {
      type: 'ssml-w',
      remark: '连读',
      children: [{ text: value }]
    }

    SlateTransforms.insertNodes(this.editor, node)
  }
}
