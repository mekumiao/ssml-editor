import { type IDomEditor } from '@wangeditor/editor'
import type { IdText, Prosody } from '../core/custom-types'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import { defineComponent, inject, ref, withModifiers, type ShallowRef } from 'vue'
import { BarButton } from '@/components'
import { ElPopover } from 'element-plus'
import { bindClose } from './helper'

function genDomID(): string {
  return genRandomStr('w-e-dom-changespeed')
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

    // SlateTransforms.wrapNodes(editor, node, { voids: false })

    bindClose<Prosody>(editor, 'ssml-prosody', node.domId, (nodeEntity) => {
      SlateTransforms.unwrapNodes(editor, { at: nodeEntity[1] })
    })
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
  emits: ['error'],
  setup(_props, { emit }) {
    const fn = new SpeakerFn()
    const editorRef = inject<ShallowRef>('editor')
    const rates = ref<IdText[]>([])
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
        emit('error', '选中一个中文字符，并且有不能在其他语句之内')
        return
      }

      show()
    }

    return () => (
      <ElPopover
        style={{ padding: '0px' }}
        v-model:visible={visible.value}
        trigger="contextmenu"
        hideAfter={0}
      >
        {{
          reference: () => (
            <BarButton text="局部变速" icon="changespeed" onClick={handleClick}></BarButton>
          ),
          default: () => (
            <div
              class="d-flex flex-column overflow-x-hidden overflow-y-scroll"
              style="height:15rem"
            >
              {rates.value.map(({ id, text }) => {
                return (
                  <div
                    key={id}
                    class="clickable w-100 fs-6 rounded-1 px-3 py-2"
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
