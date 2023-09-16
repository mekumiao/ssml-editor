import { SlateRange, type IDomEditor } from '@wangeditor/editor'
import { emitter } from '@/event-bus'
import BaseFn from '../base-fn'
import type { Prosody } from '@/core'
import { readValueMap, type ReadLabelValue } from './data'

export class ReadFn extends BaseFn {
  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public isDisabled(): boolean {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (!selection) return true
    if (selection == null) return true
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit('error', '请框选词或句子')
      return true
    }

    return false
  }

  exec(opt: ReadLabelValue) {
    this.editor.restoreSelection()
    if (this.isDisabled()) return
    const value = this.getValue()
    if (value == null) return

    const { pitch, rate } = readValueMap[opt.value]
    const node: Prosody = {
      type: 'ssml-prosody',
      remark: opt.label,
      pitch,
      rate,
      children: [{ text: value }],
    }

    this.editor.insertNode(node)
  }
}
