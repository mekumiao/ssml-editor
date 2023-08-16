import throttle from 'lodash.throttle'
import { type IDomEditor } from '@wangeditor/core'
import type { IdText, P, Prosody } from '../custom-types'
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
import EditBarButton from '../../components/EditBarButton.vue'
import { ElMessage, ElPopover, type PopoverInstance } from 'element-plus'

function genDomID(): string {
  return genRandomStr('w-e-insert-changespeed')
}

class SpeakerFn {
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
    if (value.length <= 1) return true

    return false
  }

  exec(editor: IDomEditor, rate: string) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return
    const value = this.getValue(editor)
    if (value == null) return

    const node: Prosody = {
      type: 'ssml-prosody',
      domId: genDomID(),
      remark: rate,
      rate: rate,
      bgColor: 'changespeed',
      children: [{ text: value }]
    }

    SlateTransforms.delete(editor)
    SlateTransforms.insertNodes(editor, node)

    const $body = $('body')
    const domId = `#${node.domId}`

    const handler = throttle((event: Event) => {
      event.preventDefault()

      SlateTransforms.unwrapNodes(editor, {
        at: [0],
        match: (n) => {
          if (!SlateElement.isElement(n)) return false
          if (!DomEditor.checkNodeType(n, 'ssml-prosody')) return false
          return (n as P).domId === node.domId
        }
      })
    })

    $body.on('click', domId, handler)
  }
}

function fetchRates(): Promise<IdText[]> {
  const res = [] as IdText[]
  for (let index = 2; index <= 40; index++) {
    const text = `${(index * 0.05).toFixed(2)}x`
    res.push({ id: index.toString(), text: text, remark: text })
  }
  return Promise.resolve(res)
}

export default defineComponent({
  setup() {
    const fn = new SpeakerFn()
    const editorRef = inject<ShallowRef>('editor')
    const rates = ref<IdText[]>([])
    const popover = ref<PopoverInstance>()
    const visible = ref(false)

    function show() {
      if (visible.value) return
      visible.value = true
    }

    function hide() {
      if (!visible.value) return
      visible.value = false
    }

    async function handleClick(editor: IDomEditor) {
      rates.value = await fetchRates()
      if (fn.isDisabled(editor)) {
        ElMessage.warning({
          message: '选中一个中文字符，并且有不能在其他语句之内',
          grouping: true,
          type: 'warning'
        })
        return
      }

      show()
    }

    return () => (
      <ElPopover
        style={{ padding: '0px' }}
        ref={popover}
        v-model:visible={visible.value}
        trigger="contextmenu"
        hideAfter={0}
      >
        {{
          reference: () => (
            <EditBarButton text="局部变速" icon="changespeed" onClick={handleClick}></EditBarButton>
          ),
          default: () => (
            <div class="flex flex-col h h-50 scroll scroll-y">
              {rates.value.map(({ id, text }) => {
                return (
                  <div
                    key={id}
                    class="btn full"
                    onClick={() => {
                      if (!fn.isDisabled(editorRef?.value)) {
                        fn.exec(editorRef?.value, text)
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
