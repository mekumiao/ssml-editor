import { type IDomEditor } from '@wangeditor/editor'
import type { W } from '../core/custom-types'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import { defineComponent } from 'vue'
import { BarButton } from '@/components'
import { bindClose } from './helper'

function genDomID(): string {
  return genRandomStr('w-e-dom-continuous')
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

    bindClose(editor, 'ssml-w', node.domId, (nodeEntity) => {
      SlateTransforms.unwrapNodes(editor, { at: nodeEntity[1] })
    })
  }
}

export default defineComponent({
  emits: ['error'],
  setup(_props, { emit }) {
    const fn = new ContinuousFn()

    function handleClick(editor: IDomEditor) {
      if (fn.isDisabled(editor)) return emit('error', '请选择多个中文字符或者多个多个英文单词')
      fn.exec(editor)
    }

    return () => <BarButton text="连读" icon="continuous" onClick={handleClick}></BarButton>
  }
})
