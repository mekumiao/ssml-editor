import throttle from 'lodash.throttle'
import { type IDomEditor } from '@wangeditor/core'
import type { Speaker } from '../custom-types'
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
import { defineComponent, ref, withModifiers } from 'vue'

function genDomID(): string {
  return genRandomStr('w-e-insert-speaker')
}

export class SpeakerFn {
  private getValue(editor: IDomEditor): string | null {
    const { selection } = editor
    if (selection == null) return null
    return SlateEditor.string(editor, selection)
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (SlateRange.isCollapsed(selection)) return true

    const value = SlateEditor.string(editor, selection)
    if (value.length != 1) return true

    return false
  }

  exec(editor: IDomEditor) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return
    const value = this.getValue(editor)
    if (value == null) return

    const node: Speaker = {
      type: 'speaker',
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

      const [nodeEntity] = SlateEditor.nodes<Speaker>(editor, {
        at: [0],
        match: (n) => {
          if (!SlateElement.isElement(n)) return false
          if (!DomEditor.checkNodeType(n, 'speaker')) return false
          return (n as Speaker).domId === node.domId
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

export const SpeakerView = defineComponent({
  setup() {
    const count = ref(0)
    const inc = () => {
      count.value++
    }
    return () => <div onClick={withModifiers(inc, ['self'])}>{count.value}</div>
  }
})
