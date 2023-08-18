import { type IDomEditor } from '@wangeditor/editor'
import type { Sub } from '../core/custom-types'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import { defineComponent, inject, ref, shallowRef, type ShallowRef } from 'vue'
import { BarButton, BarInput } from '@/components'
import { bindClose, unpackVoid } from './helper'
import { ElPopover } from 'element-plus'

function genDomID(): string {
  return genRandomStr('w-e-dom-alias')
}

class AliasFn {
  getValue(editor: IDomEditor): string | null {
    const { selection } = editor
    if (selection == null) return null
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
    const fn = new AliasFn()
    const editorRef = inject<ShallowRef<IDomEditor>>('editor')
    const inputRef = ref()
    const visible = ref(false)
    const editorSelection = shallowRef()

    function show() {
      if (visible.value) return
      visible.value = true
    }

    function hide() {
      if (!visible.value) return
      visible.value = false
    }

    async function handleClick(editor: IDomEditor) {
      if (fn.isDisabled(editor)) {
        emit('error', '选中一个中文字符，并且有不能在其他语句之内')
        return
      }

      show()
      editorSelection.value = editor.selection
      inputRef.value.focus()
    }

    function handleSubmit(text: string | null) {
      hide()
      const editor = editorRef?.value
      if (!editor || !text) return
      editor.select(editorSelection.value)
      if (fn.isDisabled(editor)) return
      fn.exec(editor, text)
    }

    return () => (
      <ElPopover
        v-model:visible={visible.value}
        trigger="contextmenu"
        placement="right-end"
        hideAfter={0}
        width={200}
      >
        {{
          reference: () => <BarButton text="别名" icon="alias" onClick={handleClick}></BarButton>,
          default: () => <BarInput ref={inputRef} onSubmit={handleSubmit}></BarInput>
        }}
      </ElPopover>
    )
  }
})
