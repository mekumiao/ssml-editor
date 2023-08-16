import throttle from 'lodash.throttle'
import { type IDomEditor } from '@wangeditor/core'
import type { Break, IdText } from '../custom-types'
import {
  SlateTransforms,
  SlateEditor,
  SlateRange,
  SlateElement,
  DomEditor
} from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import $ from '@/utils/dom'
import { defineComponent, inject, ref, withModifiers, type ShallowRef } from 'vue'
import EditBarButton from '@/components/EditBarButton.vue'
import { ElMessage, ElPopover } from 'element-plus'

function genDomID(): string {
  return genRandomStr('w-e-insert-rhythm')
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

    const $body = $('body')
    const domId = `#${node.domId}`

    const handler = throttle((event: Event) => {
      event.preventDefault()

      const [nodeEntity] = SlateEditor.nodes<Break>(editor, {
        at: [0],
        match: (n) => {
          if (!SlateElement.isElement(n)) return false
          if (!DomEditor.checkNodeType(n, 'ssml-break')) return false
          return (n as Break).domId === node.domId
        }
      })
      if (nodeEntity == null) return

      SlateTransforms.delete(editor, { at: nodeEntity[1] })
    })

    $body.on('click', domId, handler)
  }
}

const idTextList: IdText[] = [
  { id: '200ms', text: '短', remark: '短' },
  { id: '300ms', text: '中', remark: '中' },
  { id: '500ms', text: '长', remark: '长' }
]

export default defineComponent({
  setup() {
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
        ElMessage.warning({
          message: '不能选择文本',
          grouping: true,
          type: 'warning'
        })
        return
      }

      show()
    }

    return () => (
      <ElPopover v-model:visible={visible.value} trigger="contextmenu" hideAfter={0}>
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
      </ElPopover>
    )
  }
})
