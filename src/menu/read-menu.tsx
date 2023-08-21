import { type IDomEditor } from '@wangeditor/editor'
import type { W } from '../core/custom-types'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import { defineComponent, inject, ref, withModifiers, type ShallowRef } from 'vue'
import { BarButton } from '@/components'
import { bindClose, unpackVoid } from './helper'
import { ElPopover } from 'element-plus'
import { EMITTER_EVENT, PROVIDER_KEY } from '@/constant'
import { emitter } from '@/event-bus'

function genDomID(): string {
  return genRandomStr('w-e-dom-read')
}

export class ReadFn {
  getValue(editor: IDomEditor): string | null {
    const { selection } = editor
    if (selection == null) return ''
    return SlateEditor.string(editor, selection)
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit(EMITTER_EVENT.ERROR, '请先选择文本')
      return true
    }

    return false
  }

  exec(editor: IDomEditor, opt: LabelValue) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return
    const value = this.getValue(editor)
    if (value == null) return

    const node: W = {
      type: 'ssml-w',
      domId: genDomID(),
      phoneme: opt.value,
      remark: opt.label,
      value: value,
      bgColor: 'read',
      children: [{ text: value }]
    }

    SlateTransforms.delete(editor)
    SlateTransforms.insertNodes(editor, node)

    bindClose<W>(editor, 'ssml-w', node.domId, (nodeEntity) =>
      unpackVoid(editor, nodeEntity, () => value)
    )
  }
}

const readList: LabelValue[] = [
  { label: '重音', value: '重' },
  { label: '拖音', value: '拖' },
  { label: '重音+拖音', value: '重+拖' }
]

export default defineComponent({
  setup() {
    const fn = new ReadFn()
    const editorRef = inject<ShallowRef<IDomEditor>>(PROVIDER_KEY.EDITOR)!
    const visible = ref(false)

    function show() {
      if (visible.value) return
      visible.value = true
    }

    function hide() {
      if (!visible.value) return
      visible.value = false
    }

    function handleClick() {
      if (fn.isDisabled(editorRef.value)) return

      show()
    }

    return () => (
      <ElPopover v-model:visible={visible.value} trigger="contextmenu" hideAfter={0}>
        {{
          reference: () => <BarButton text="重音" icon="read" onClick={handleClick}></BarButton>,
          default: () => (
            <div
              class="d-flex flex-column"
              onMousedown={withModifiers(() => {}, ['stop', 'prevent'])}
            >
              {readList.map(({ label, value }) => {
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
