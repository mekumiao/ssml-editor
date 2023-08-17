import { type IDomEditor } from '@wangeditor/editor'
import type { W, IdText } from '../core/custom-types'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import {
  defineComponent,
  inject,
  ref,
  withModifiers,
  type ShallowRef,
  resolveDynamicComponent
} from 'vue'
import EditBarButton from './EditBarButton.vue'
import { bindClose, unpackVoid } from './helper'

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
    if (SlateRange.isCollapsed(selection)) return true

    const value = SlateEditor.string(editor, selection)
    if (value.length <= 0) return true

    return false
  }

  exec(editor: IDomEditor, idtext: IdText) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return
    const value = this.getValue(editor)
    if (value == null) return

    const node: W = {
      type: 'ssml-w',
      domId: genDomID(),
      phoneme: idtext.id,
      remark: idtext.remark,
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

const readList: IdText[] = [
  { id: 'z', text: '重音', remark: '重' },
  { id: 't', text: '拖音', remark: '拖' },
  { id: 'all', text: '重音+拖音', remark: '重+拖' }
]

export default defineComponent({
  emits: ['error'],
  props: ['popover'],
  setup(props, { emit }) {
    const fn = new ReadFn()
    const editorRef = inject<ShallowRef>('editor')
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
        emit('error', '请先选择文本')
        return
      }

      show()
    }

    const MyPopover = resolveDynamicComponent(props.popover) as any

    return () => (
      <MyPopover v-model:visible={visible.value} trigger="contextmenu" hideAfter={0}>
        {{
          reference: () => (
            <EditBarButton text="重音" icon="read" onClick={handleClick}></EditBarButton>
          ),
          default: () => (
            <div class="flex flex-col" onMousedown={withModifiers(() => {}, ['stop', 'prevent'])}>
              {readList.map(({ id, text, remark }) => {
                return (
                  <div
                    key={id}
                    class="btn full"
                    onClick={() => {
                      if (!fn.isDisabled(editorRef?.value)) {
                        fn.exec(editorRef?.value, { id, text, remark })
                      }
                      hide()
                    }}
                    onMousedown={withModifiers(() => {}, ['stop', 'prevent'])}
                  >
                    {text}
                  </div>
                )
              })}
            </div>
          )
        }}
      </MyPopover>
    )
  }
})
