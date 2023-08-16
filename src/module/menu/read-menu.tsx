import throttle from 'lodash.throttle'
import { type IDomEditor } from '@wangeditor/core'
import type { W, IdText } from '../custom-types'
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
import { defineComponent, inject, ref, withModifiers, type ShallowRef } from 'vue'
import EditBarButton from '@/components/EditBarButton.vue'
import { ElMessage, ElPopover, type PopoverInstance } from 'element-plus'

function genDomID(): string {
  return genRandomStr('w-e-insert-read')
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

    const $body = $('body')
    const domId = `#${node.domId}`

    const handler = throttle((event: Event) => {
      event.preventDefault()

      const [nodeEntity] = SlateEditor.nodes<W>(editor, {
        at: [],
        match: (n) => {
          if (!SlateElement.isElement(n)) return false
          if (!DomEditor.checkNodeType(n, 'ssml-w')) return false
          return (n as W).domId === node.domId
        },
        universal: false
      })

      if (nodeEntity == null) return

      const preNodeEntity = SlateEditor.previous(editor, {
        at: nodeEntity[1],
        match: (n) => SlateText.isText(n)
      })
      if (preNodeEntity == null) return

      SlateTransforms.insertText(editor, value, {
        at: SlateEditor.end(editor, preNodeEntity[1])
      })
      SlateTransforms.delete(editor, { at: SlatePath.next(preNodeEntity[1]) })

      // $body.off('click', domId, handler)
    })

    $body.on('click', domId, handler)
  }
}

const readList: IdText[] = [
  { id: 'z', text: '重音', remark: '重' },
  { id: 't', text: '拖音', remark: '拖' },
  { id: 'all', text: '重音+拖音', remark: '重+拖' }
]

export default defineComponent({
  setup() {
    const fn = new ReadFn()
    const editorRef = inject<ShallowRef>('editor')
    const visible = ref(false)
    const popover = ref<PopoverInstance>()

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
          message: '请先选择文本',
          grouping: true,
          type: 'warning'
        })
        return
      }

      show()
    }

    return () => (
      <ElPopover
        visible={visible.value}
        ref={popover}
        onUpdate:visible={(value) => (visible.value = value)}
        trigger="contextmenu"
        hideAfter={0}
      >
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
      </ElPopover>
    )
  }
})
