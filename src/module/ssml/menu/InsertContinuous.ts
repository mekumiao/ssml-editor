import throttle from 'lodash.throttle'
import { type IButtonMenu, type IDomEditor } from '@wangeditor/core'
import type { Continuous } from '../custom-types'
import {
  SlateTransforms,
  SlateEditor,
  SlateRange,
  SlateElement,
  DomEditor
} from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import $ from '@/utils/dom'

function genDomID(): string {
  return genRandomStr('w-e-insert-continuous')
}

class InsertContinuous implements IButtonMenu {
  readonly title = '插入连读'
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
    if (value.length < 2) return true

    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    if (this.isDisabled(editor)) return
    if (!value || typeof value !== 'string') return

    const { selection } = editor
    if (selection == null) return

    const node: Continuous = {
      type: 'continuous',
      domId: genDomID(),
      children: [{ text: value }]
    }

    SlateTransforms.delete(editor)
    SlateTransforms.insertNodes(editor, node)

    const $body = $('body')
    const domId = `#${node.domId}`

    const handler = throttle((event: Event) => {
      event.preventDefault()

      SlateTransforms.unwrapNodes(editor, {
        at: [0],
        match: (n) => {
          if (!SlateElement.isElement(n)) return false
          if (!DomEditor.checkNodeType(n, 'continuous')) return false
          return (n as Continuous).domId === node.domId
        }
      })

      $body.off('click', domId, handler)
    })

    $body.on('click', domId, handler)
  }
}

export default InsertContinuous
