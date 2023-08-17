import { type IDomEditor } from '@wangeditor/editor'
import type { Break, IdText } from '../core/custom-types'
import { SlateTransforms, SlateRange } from '@wangeditor/editor'
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
import { bindClose } from './helper'

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

  exec(editor: IDomEditor, idtext: IdText) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return

    const node: Break = {
      type: 'ssml-break',
      domId: genDomID(),
      time: idtext.id,
      remark: idtext.remark,
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

const idTextList: IdText[] = [
  { id: '200ms', text: '短', remark: '短' },
  { id: '300ms', text: '中', remark: '中' },
  { id: '500ms', text: '长', remark: '长' }
]

export default defineComponent({
  emits: ['error'],
  props: ['popover'],
  setup(props, { emit }) {
    const fn = new RhythmFn()
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
        emit('error', '不能选择文本')
        return
      }

      show()
    }
    const MyPopover = resolveDynamicComponent(props.popover) as any

    return () => (
      <MyPopover v-model:visible={visible.value} trigger="contextmenu" hideAfter={0}>
        {{
          reference: () => (
            <EditBarButton text="停顿调节" icon="rhythm" onClick={handleClick}></EditBarButton>
          ),
          default: () => (
            <div class="flex flex-col">
              {idTextList.map(({ id, text, remark }) => {
                return (
                  <div
                    key={id}
                    class="btn radius ssml-menu item full"
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
