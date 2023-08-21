import { type IDomEditor } from '@wangeditor/editor'
import type { Break } from '../core/custom-types'
import { SlateTransforms, SlateRange } from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import { defineComponent, inject, ref, withModifiers, type ShallowRef, shallowRef } from 'vue'
import { BarButton, BarInput } from '@/components'
import { bindClose } from './helper'
import { ElPopover } from 'element-plus'
import { PROVIDER_KEY } from '@/constant'

function genDomID(): string {
  return genRandomStr('w-e-dom-mute')
}

export class MuteFn {
  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (SlateRange.isExpanded(selection)) return true

    return false
  }

  exec(editor: IDomEditor, mute: string) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return

    const node: Break = {
      type: 'ssml-break',
      domId: genDomID(),
      time: mute,
      remark: mute,
      bgColor: 'mute',
      children: [{ text: '' }]
    }

    SlateTransforms.insertNodes(editor, node)
    editor.move(1)

    bindClose(editor, 'ssml-break', node.domId, (nodeEntity) => {
      SlateTransforms.delete(editor, { at: nodeEntity[1] })
    })
  }
}

const options: LabelValue[] = [
  { value: '150ms', label: '150ms' },
  { value: '200ms', label: '200ms' },
  { value: '300ms', label: '300ms' },
  { value: '400ms', label: '400ms' },
  { value: '500ms', label: '500ms' },
  { value: '600ms', label: '600ms' }
]

export default defineComponent({
  emits: ['error'],
  setup(_props, { emit }) {
    const fn = new MuteFn()
    const editorRef = inject<ShallowRef<IDomEditor>>(PROVIDER_KEY.EDITOR)
    if (!editorRef) emit('error', '请注入editor')
    const visible = ref(false)
    const inputRef = ref()

    const editorSelection = shallowRef()

    function show() {
      if (visible.value) return
      visible.value = true
    }

    function hide() {
      if (!visible.value) return
      visible.value = false
    }

    function handleClick(editor: IDomEditor) {
      if (fn.isDisabled(editor)) {
        emit('error', '不能选择文本')
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
      <ElPopover v-model:visible={visible.value} trigger="contextmenu" hideAfter={0} width={200}>
        {{
          reference: () => (
            <BarButton text="插入静音" icon="mute" onClick={handleClick}></BarButton>
          ),
          default: () => (
            <div class="d-flex flex-column">
              {options.map(({ value, label }) => {
                return (
                  <div
                    key={value}
                    class="clickable w-100 fs-6 rounded-1 px-3 py-2"
                    onClick={() => handleSubmit(value)}
                    onMousedown={withModifiers(() => {}, ['stop', 'prevent'])}
                  >
                    {label}
                  </div>
                )
              })}
              <BarInput type="number" ref={inputRef} onSubmit={handleSubmit}></BarInput>
            </div>
          )
        }}
      </ElPopover>
    )
  }
})
