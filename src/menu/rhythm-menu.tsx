import { type IDomEditor } from '@wangeditor/editor'
import type { Break } from '../core/custom-types'
import { SlateTransforms, SlateRange } from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import { defineComponent, inject, ref, withModifiers, type ShallowRef } from 'vue'
import { BarButton } from '@/components'
import { bindClose } from './helper'
import { ElPopover } from 'element-plus'
import { PROVIDER_KEY } from '@/constant'

function genDomID(): string {
  return genRandomStr('w-e-dom-rhythm')
}

export class RhythmFn {
  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (SlateRange.isExpanded(selection)) return true

    return false
  }

  exec(editor: IDomEditor, opt: LabelValue) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return

    const node: Break = {
      type: 'ssml-break',
      domId: genDomID(),
      time: opt.value,
      remark: opt.label,
      bgColor: 'rhythm',
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
  { value: '200ms', label: '短' },
  { value: '300ms', label: '中' },
  { value: '500ms', label: '长' }
]

export default defineComponent({
  emits: ['error'],
  setup(_props, { emit }) {
    const fn = new RhythmFn()
    const editorRef = inject<ShallowRef<IDomEditor>>(PROVIDER_KEY.EDITOR)
    const visible = ref(false)

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
    }

    return () => (
      <ElPopover v-model:visible={visible.value} trigger="contextmenu" hideAfter={0}>
        {{
          reference: () => (
            <BarButton text="停顿调节" icon="rhythm" onClick={handleClick}></BarButton>
          ),
          default: () => (
            <div class="d-flex flex-column">
              {options.map(({ label, value }) => {
                return (
                  <div
                    key={value}
                    class="clickable w-100 fs-6 rounded-1 px-3 py-2"
                    onClick={() => {
                      if (editorRef && !fn.isDisabled(editorRef.value)) {
                        fn.exec(editorRef.value, { label, value })
                      }
                      hide()
                    }}
                    onMousedown={withModifiers(() => {}, ['stop', 'prevent'])}
                  >
                    {label}
                  </div>
                )
              })}
            </div>
          )
        }}
      </ElPopover>
    )
  }
})
