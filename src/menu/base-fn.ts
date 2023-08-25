import { type IDomEditor } from '@wangeditor/editor'
import { SlateEditor } from '@wangeditor/editor'
import { emitter } from '@/event-bus'
import { EMITTER_EVENT } from '@/constant'
import type { LabelValue } from '@/model'

export default abstract class BaseFn {
  protected readonly editor: IDomEditor
  protected abstract readonly key: string

  public constructor(editor: IDomEditor) {
    this.editor = editor
  }

  protected getValue(): string {
    const { selection } = this.editor
    if (selection == null) return ''
    return SlateEditor.string(this.editor, selection)
  }

  public isDisabled(): boolean {
    const { selection } = this.editor
    if (selection == null) {
      emitter.emit(EMITTER_EVENT.ERROR, '未选中编辑器')
      return true
    }
    return false
  }

  public abstract exec(opt: LabelValue): void
}
