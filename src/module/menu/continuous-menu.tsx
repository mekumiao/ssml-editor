import throttle from 'lodash.throttle'
import { type IDomEditor } from '@wangeditor/core'
import type { W } from '../custom-types'
import {
  SlateTransforms,
  SlateEditor,
  SlateRange,
  SlateElement,
  DomEditor
} from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import $ from '@/utils/dom'
import { defineComponent } from 'vue'
import EditBarButton from '@/components/EditBarButton.vue'
import { ElMessage } from 'element-plus'

function genDomID(): string {
  return genRandomStr('w-e-insert-continuous')
}

export class ContinuousFn {
  getValue(editor: IDomEditor): string {
    const { selection } = editor
    if (selection == null) return ''
    return SlateEditor.string(editor, selection)
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (SlateRange.isCollapsed(selection)) return true

    const value = SlateEditor.string(editor, selection)
    if (value.length < 2) return true

    return false
  }

  exec(editor: IDomEditor) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return

    const value = this.getValue(editor)
    if (value == null) return

    const node: W = {
      type: 'ssml-w',
      domId: genDomID(),
      children: [{ text: value }],
      remark: '连读',
      bgColor: 'continuous'
    }

    SlateTransforms.delete(editor)
    SlateTransforms.insertNodes(editor, node)

    const $body = $('body')
    const domId = `#${node.domId}`

    const handler = throttle((event: Event) => {
      event.preventDefault()

      SlateTransforms.unwrapNodes(editor, {
        at: [],
        match: (n) => {
          if (!SlateElement.isElement(n)) return false
          if (!DomEditor.checkNodeType(n, 'ssml-w')) return false
          return (n as W).domId === node.domId
        }
      })

      // $body.off('click', domId, handler)
    })

    $body.on('click', domId, handler)
  }
}

export default defineComponent({
  setup() {
    const fn = new ContinuousFn()

    function handleClick(editor: IDomEditor) {
      if (fn.isDisabled(editor)) {
        ElMessage.warning({
          message: '请选择多个中文字符或者多个多个英文单词',
          grouping: true,
          type: 'warning'
        })
        return
      }
      fn.exec(editor)
    }

    return () => <EditBarButton text="连读" icon="continuous" onClick={handleClick}></EditBarButton>
  }
})
