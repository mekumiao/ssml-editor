import { type IDomEditor } from '@wangeditor/editor'
import { SlateEditor } from '@wangeditor/editor'
import { genRandomStr } from '@/utils'
import { emitter } from '@/event-bus'
import { EMITTER_EVENT } from '@/constant'
import type { LabelValue } from '@/model'
import { getSelectionByRecord, recoreSelection, unrecordSelection } from '@/stores'

export default abstract class BaseFn {
  protected readonly editor: IDomEditor
  protected abstract readonly key: string

  public constructor(editor: IDomEditor) {
    this.editor = editor
  }

  protected genDomID() {
    return genRandomStr(`w-e-dom-${this.key}`)
  }

  protected selection() {
    const { selection } = this.editor
    return selection ?? getSelectionByRecord()
  }

  protected getValue(): string {
    const selection = this.selection()
    if (selection == null) return ''
    return SlateEditor.string(this.editor, selection)
  }

  public record() {
    recoreSelection(this.editor)
  }

  public unrecord() {
    unrecordSelection()
  }

  public reselect() {
    const selection = this.selection()
    selection && this.editor.select(selection)
  }

  public isDisabled(): boolean {
    const selection = this.selection()
    if (selection == null) {
      emitter.emit(EMITTER_EVENT.ERROR, '未选中编辑器')
      return true
    }
    return false
  }

  public abstract exec(opt: LabelValue): void
}
