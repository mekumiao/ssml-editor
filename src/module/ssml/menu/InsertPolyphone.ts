import { type IButtonMenu, type IDomEditor } from '@wangeditor/core'
import type { Polyphone } from '../custom-types'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'

class InsertPolyphone implements IButtonMenu {
  readonly title = '插入拼音'
  readonly tag = 'button'

  getValue(editor: IDomEditor): string | boolean {
    const { selection } = editor
    if (selection == null) return ''
    return SlateEditor.string(editor, selection)
  }

  isActive(): boolean {
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (SlateRange.isCollapsed(selection)) return true

    const value = SlateEditor.string(editor, selection)
    if (value.length != 1) return true

    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    if (this.isDisabled(editor)) return
    if (!value || typeof value !== 'string') return

    const { selection } = editor
    if (selection == null) return

    const nodes: Polyphone = {
      type: 'polyphone',
      value: value,
      pinyin: 'de5',
      children: [{ text: '' }]
    }

    SlateTransforms.delete(editor)
    SlateTransforms.insertNodes(editor, nodes)
    editor.move(1)
  }
}

export default InsertPolyphone
