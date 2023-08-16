import throttle from 'lodash.throttle'
import { type IDomEditor } from '@wangeditor/core'
import type { SayAs, IdText } from '../custom-types'
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
  return genRandomStr('w-e-insert-digital')
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
    if (SlateRange.isCollapsed(selection)) return true

    const value = SlateEditor.string(editor, selection)
    if (value.length <= 0) return true

    if (Number.isNaN(Number(value))) return true

    return false
  }

  exec(editor: IDomEditor, idtext: IdText) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return
    const value = this.getValue(editor)
    if (value == null) return

    const node: SayAs = {
      type: 'ssml-say-as',
      domId: genDomID(),
      interpretAs: idtext.id,
      remark: idtext.remark,
      bgColor: 'digital',
      children: [{ text: value }]
    }

    SlateTransforms.delete(editor)
    SlateTransforms.insertNodes(editor, node)

    const $body = $('body')
    const domId = `#${node.domId}`

    const handler = throttle((event: Event) => {
      event.preventDefault()

      SlateTransforms.unwrapNodes(editor, {
        at: [],
        match: (n) => {
          if (!SlateElement.isElement(n)) return false
          if (!DomEditor.checkNodeType(n, 'ssml-say-as')) return false
          return (n as SayAs).domId === node.domId
        }
      })
    })

    $body.on('click', domId, handler)
  }
}

const idTextList: IdText[] = [
  { id: 'value', text: '读数值', remark: '读数值' },
  { id: 'digits', text: '读数字', remark: '读数字' },
  { id: 'telephone', text: '读手机号', remark: '读手机号' }
]

export default defineComponent({
  setup() {
    const fn = new DigitalFn()
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
          message: '请选择纯数字文本',
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
            <EditBarButton text="数字符号" icon="digital" onClick={handleClick}></EditBarButton>
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
