import {
  SlateRange,
  type IDomEditor,
  SlateEditor,
  SlateTransforms,
  DomEditor
} from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { EMITTER_EVENT } from '@/constant'
import { emitter } from '@/event-bus'
import type { LabelValue } from '@/model'
import type { Alias } from '@/core/alias'
import { unpackVoid } from '../helper'
import type { NodeEntry } from 'slate'

export class AliasFn extends BaseFn {
  protected readonly key: string = 'alias'

  public constructor(editor: IDomEditor) {
    super(editor)
  }

  public static handleClose(editor: IDomEditor, item: Alias) {
    const path = DomEditor.findPath(editor, item)
    const nodeEntry = SlateEditor.node(editor, path)
    unpackVoid<Alias>(editor, nodeEntry as NodeEntry<Alias>, (elem) => elem.value)
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

    const node: Alias = {
      type: 'ssml-alias',
      domId: this.genDomID(),
      remark: `(${opt.value})`,
      alias: opt.value,
      value: value,
      bgColor: 'alias',
      children: [{ text: '' }]
    }

    SlateTransforms.delete(this.editor)
    SlateTransforms.insertNodes(this.editor, node)
    this.editor.move(1)
  }
}
