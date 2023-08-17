import throttle from 'lodash.throttle'
import { type IDomEditor } from '@wangeditor/editor'
import type { Sub } from '../core/custom-types'
import {
  SlateTransforms,
  SlateEditor,
  SlateRange,
  SlateElement,
  DomEditor,
  SlateText,
  SlatePath
} from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import $ from '@/utils/dom'
import { defineComponent, inject, ref, shallowRef, type ShallowRef } from 'vue'
import EditBarButton from './EditBarButton.vue'
import { resolveDynamicComponent } from 'vue'

function genDomID(): string {
  return genRandomStr('w-e-insert-alias')
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

    const $body = $('body')
    const domId = `#${node.domId}`

    const handler = throttle((event: Event) => {
      event.preventDefault()

      const [nodeEntity] = SlateEditor.nodes<Sub>(editor, {
        at: [],
        match: (n) => {
          if (!SlateElement.isElement(n)) return false
          if (!DomEditor.checkNodeType(n, 'ssml-sub')) return false
          return (n as Sub).domId === node.domId
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
    })

    $body.on('click', domId, handler)
  }
}

export default defineComponent({
  emits: ['error'],
  props: ['popover', 'input'],
  setup(props, { emit }) {
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

    const onSubmit = (text: string | null) => {
      hide()
      const editor = editorRef?.value
      if (!editor || !text) return
      editor.select(editorSelection.value)
      if (fn.isDisabled(editor)) return
      fn.exec(editor, text)
    }

    const MyPopover = resolveDynamicComponent(props.popover) as any
    const MyInput = resolveDynamicComponent(props.input) as any

    return () => (
      <MyPopover
        v-model:visible={visible.value}
        trigger="contextmenu"
        placement="right-end"
        hideAfter={0}
        width={200}
      >
        {{
          reference: () => (
            <EditBarButton text="别名" icon="alias" onClick={handleClick}></EditBarButton>
          ),
          default: () => <MyInput ref={inputRef} onSubmit={onSubmit}></MyInput>
        }}
      </MyPopover>
    )
  }
})
