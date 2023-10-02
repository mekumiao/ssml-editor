import { SlateRange, type IDomEditor, DomEditor, SlateTransforms } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { emitter } from '@/event-bus'
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
      emitter.emit('warn', '请框选要设置别名的词或句子')
      return true
    }

    return false
  }

  public exec(opt: LabelValue) {
    this.editor.restoreSelection()
    if (this.isDisabled()) return

    const value = this.getValue()
    if (value == null) return

    const elem: Sub = {
      type: 'ssml-sub',
      remark: opt.value,
      alias: opt.value,
      children: [{ text: value }],
    }
    const node = DomEditor.getSelectedNodeByType(this.editor, 'ssml-sub')
    if (node) {
      const partElem = elem as Partial<Sub>
      delete partElem.children
      delete partElem.type
      SlateTransforms.setNodes(this.editor, partElem, {
        at: DomEditor.findPath(this.editor, node),
      })
    } else {
      this.editor.insertNode(elem)
    }
  }
}
