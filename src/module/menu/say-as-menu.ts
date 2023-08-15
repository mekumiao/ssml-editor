import throttle from 'lodash.throttle'
import { type IDomEditor } from '@wangeditor/core'
import type { Continuous, SayAs } from '../custom-types'
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

export class SayAsFn {
  private getValue(editor: IDomEditor): string | null {
    const { selection } = editor
    if (selection == null) return ''
    return SlateEditor.string(editor, selection)
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (SlateRange.isCollapsed(selection)) return true

    const value = SlateEditor.string(editor, selection)
    if (value.length <= 0) return true

    return false
  }

  exec(editor: IDomEditor, interpret: SayAs['interpret']) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return
    const value = this.getValue(editor)
    if (value == null) return

    const node: SayAs = {
      type: 'say-as',
      domId: genDomID(),
      interpret: interpret,
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
          if (!DomEditor.checkNodeType(n, 'say-as')) return false
          return (n as Continuous).domId === node.domId
        }
      })

      $body.off('click', domId, handler)
    })

    $body.on('click', domId, handler)
  }
}

export {}
