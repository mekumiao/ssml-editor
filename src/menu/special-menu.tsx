import { type IDomEditor } from '@wangeditor/editor'
import type { Sub } from '../core/custom-types'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import { defineComponent, ref } from 'vue'
import { bindClose, unpackVoid } from './helper'
import { BarButton, BarSearch } from '@/components'
import { ElPopover } from 'element-plus'

// 音效功能

function genDomID(): string {
  return genRandomStr('w-e-dom-special')
}

class SpecialFn {
  getValue(editor: IDomEditor): string | null {
    const { selection } = editor
    if (selection == null) return null
    return SlateEditor.string(editor, selection)
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (SlateRange.isExpanded(selection)) return true

    return SlateEditor.string(editor, selection).length > 0
  }

  exec(editor: IDomEditor, alias: string) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return
    const value = this.getValue(editor)
    if (value == null) return

    const node: Sub = {
      type: 'ssml-sub',
      domId: genDomID(),
      remark: `[${alias}]`,
      alias: alias,
      value: value,
      bgColor: 'alias',
      children: [{ text: '' }]
    }

    SlateTransforms.delete(editor)
    SlateTransforms.insertNodes(editor, node)

    bindClose<Sub>(editor, 'ssml-sub', node.domId, (nodeEntity) =>
      unpackVoid(editor, nodeEntity, (elem) => elem.value)
    )
  }
}

export default defineComponent({
  emits: ['error'],
  setup(_props, { emit }) {
    const fn = new SpecialFn()
    const visible = ref(false)
    // const editorSelection = shallowRef()

    // function show() {
    //   if (visible.value) return
    //   visible.value = true
    // }

    // function hide() {
    //   if (!visible.value) return
    //   visible.value = false
    // }

    async function handleClick(editor: IDomEditor) {
      if (fn.isDisabled(editor)) {
        emit('error', '请选中编辑区，并且不能选中文字')
        return
      }

      // show()
      // editorSelection.value = editor.selection
    }

    // const onSubmit = (text: string | null) => {
    //   hide()
    //   const editor = editorRef?.value
    //   if (!editor || !text) return
    //   editor.select(editorSelection.value)
    //   if (fn.isDisabled(editor)) return
    //   fn.exec(editor, text)
    // }

    return () => (
      <ElPopover v-model:visible={visible.value} trigger="click" hideAfter={0} width={500}>
        {{
          reference: () => <BarButton text="音效" icon="special" onClick={handleClick}></BarButton>,
          default: () => <BarSearch></BarSearch>
        }}
      </ElPopover>
    )
  }
})
