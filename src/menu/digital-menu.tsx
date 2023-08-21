import { type IDomEditor } from '@wangeditor/editor'
import type { SayAs } from '../core/custom-types'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import { defineComponent, inject, ref, withModifiers, type ShallowRef } from 'vue'
import { BarButton } from '@/components'
import { ElPopover } from 'element-plus'
import { bindClose } from './helper'
import { EMITTER_EVENT, PROVIDER_KEY } from '@/constant'
import { emitter } from '@/event-bus'

function genDomID(): string {
  return genRandomStr('w-e-dom-digital')
}

export class DigitalFn {
  getValue(editor: IDomEditor): string | null {
    const { selection } = editor
    if (selection == null) return ''
    return SlateEditor.string(editor, selection)
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '请选择纯数字文本')
      return true
    }

    const value = SlateEditor.string(editor, selection)
    if (value.length <= 0) return true

    if (Number.isNaN(Number(value))) return true

    return false
  }

  exec(editor: IDomEditor, opt: LabelValue) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return
    const value = this.getValue(editor)
    if (value == null) return

    const node: SayAs = {
      type: 'ssml-say-as',
      domId: genDomID(),
      interpretAs: opt.value,
      remark: opt.label,
      bgColor: 'digital',
      children: [{ text: value }]
    }

    SlateTransforms.delete(editor)
    SlateTransforms.insertNodes(editor, node)

    bindClose(editor, 'ssml-say-as', node.domId, (nodeEntity) => {
      SlateTransforms.unwrapNodes(editor, { at: nodeEntity[1] })
    })
  }
}

const options: LabelValue[] = [
  { value: 'value', label: '读数值' },
  { value: 'digits', label: '读数字' },
  { value: 'telephone', label: '读手机号' }
]

export default defineComponent({
  emits: ['error'],
  setup() {
    const fn = new DigitalFn()
    const editorRef = inject<ShallowRef<IDomEditor>>(PROVIDER_KEY.EDITOR)!
    const visible = ref(false)

    function toggle() {
      visible.value = !visible.value
    }

    function handleClick() {
      if (fn.isDisabled(editorRef.value)) {
        return
      }
      toggle()
    }

    return () => (
      <ElPopover v-model:visible={visible.value} trigger="contextmenu" hideAfter={0}>
        {{
          reference: () => (
            <BarButton text="数字符号" icon="digital" onClick={handleClick}></BarButton>
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
                      toggle()
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
