import { type IDomEditor } from '@wangeditor/editor'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { genRandomStr, playSound } from '@/utils'
import type { Audio } from '@/core'
import { bindClose, bindPlay } from '../helper'
import { emitter } from '@/event-bus'
import { EMITTER_EVENT } from '@/constant'

// 音效功能

function genDomID(): string {
  return genRandomStr('w-e-dom-special')
}

export default class SpecialFn {
  private readonly editor: IDomEditor
  private oldSelection?: SlateRange

  public constructor(editor: IDomEditor) {
    this.editor = editor
  }

  recordSelection() {
    this.oldSelection = this.editor.selection as SlateRange
  }

  private getSelection() {
    const { selection } = this.editor
    return selection ?? (this.oldSelection as SlateRange)
  }

  getValue(): string | null {
    const { selection } = this.editor
    if (selection == null) return null
    return SlateEditor.string(this.editor, selection)
  }

  isDisabled(): boolean {
    const selection = this.getSelection()
    if (selection == null) {
      emitter.emit(EMITTER_EVENT.ERROR, '未选中编辑器')
      return true
    }
    if (SlateRange.isExpanded(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '不能框选文字')
      return true
    }
    return false
  }

  exec(opt: LabelValue) {
    if (this.isDisabled()) return
    this.editor.select(this.getSelection())

    const value = this.getValue()
    if (value == null) return

    const node: Audio = {
      type: 'ssml-audio',
      domId: genDomID(),
      src: opt.value,
      remark: opt.label,
      bgColor: 'special',
      children: [{ text: '' }]
    }

    SlateTransforms.insertNodes(this.editor, node)
    this.editor.move(1)

    bindClose<Audio>(this.editor, 'ssml-audio', node.domId, (nodeEntity) =>
      SlateTransforms.delete(this.editor, { at: nodeEntity[1] })
    )

    bindPlay<Audio>(this.editor, 'ssml-audio', node.domId, (nodeEntity) =>
      playSound(nodeEntity[0].src)
    )
  }
}
