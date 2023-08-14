import throttle from 'lodash.throttle'
import { type IButtonMenu, type IDomEditor } from '@wangeditor/core'
import type { Polyphone } from '../custom-types'
import {
  SlateTransforms,
  SlateEditor,
  SlateRange,
  SlateElement,
  DomEditor,
  SlatePath,
  SlateText
} from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import $ from '@/utils/dom'

function genDomID(): string {
  return genRandomStr('w-e-insert-polyphone')
}

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

    const node: Polyphone = {
      type: 'polyphone',
      domId: genDomID(),
      value: value,
      pinyin: 'de5',
      children: [{ text: '' }]
    }

    SlateTransforms.delete(editor)
    SlateTransforms.insertNodes(editor, node)
    editor.move(1)

    const $body = $('body')
    const domId = `#${node.domId}`

    const handler = throttle((event: Event) => {
      event.preventDefault()

      const [nodeEntity] = SlateEditor.nodes<Polyphone>(editor, {
        at: [0],
        match: (n) => {
          if (!SlateElement.isElement(n)) return false
          if (!DomEditor.checkNodeType(n, 'polyphone')) return false
          return (n as Polyphone).domId === node.domId
        }
      })
      if (nodeEntity == null) return

      const preNodeEntity = SlateEditor.previous(editor, {
        at: nodeEntity[1],
        match: (n) => SlateText.isText(n)
      })
      if (preNodeEntity == null) return

      SlateTransforms.insertText(editor, nodeEntity[0].value, {
        at: SlateEditor.end(editor, preNodeEntity[1])
      })
      SlateTransforms.delete(editor, { at: SlatePath.next(preNodeEntity[1]) })

      $body.off('click', domId, handler)
    })

    $body.on('click', domId, handler)
  }
}

export default InsertPolyphone
