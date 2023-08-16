import throttle from 'lodash.throttle'
import { type IDomEditor } from '@wangeditor/core'
import type { IdText, P } from '../custom-types'
import {
  SlateTransforms,
  SlateEditor,
  SlateRange,
  SlateElement,
  DomEditor,
  SlatePath,
  SlateText
} from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import $ from '@/utils/dom'
import { defineComponent, inject, ref, withModifiers, type ShallowRef } from 'vue'
import EditBarButton from '../../components/EditBarButton.vue'
import { ElMessage, ElPopover, type PopoverInstance } from 'element-plus'

function genDomID(): string {
  return genRandomStr('w-e-insert-speaker')
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
    if (value.length != 1) return true

    if (!/^[\u4E00-\u9FA5]+$/gi.test(value)) return true

    return false
  }

  exec(editor: IDomEditor, pinyin: string) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return
    const value = this.getValue(editor)
    if (value == null) return

    const node: P = {
      type: 'ssml-p',
      domId: genDomID(),
      word: value,
      phoneme: pinyin,
      remark: pinyin,
      bgColor: 'speaker',
      children: [{ text: '' }]
    }

    SlateTransforms.delete(editor)
    SlateTransforms.insertNodes(editor, node)
    editor.move(1)

    const $body = $('body')
    const domId = `#${node.domId}`

    const handler = throttle((event: Event) => {
      event.preventDefault()

      const [nodeEntity] = SlateEditor.nodes<P>(editor, {
        at: [],
        match: (n) => {
          if (!SlateElement.isElement(n)) return false
          if (!DomEditor.checkNodeType(n, 'ssml-p')) return false
          return (n as P).domId === node.domId
        }
      })
      if (nodeEntity == null) return

      const preNodeEntity = SlateEditor.previous(editor, {
        at: nodeEntity[1],
        match: (n) => SlateText.isText(n)
      })
      if (preNodeEntity == null) return

      SlateTransforms.insertText(editor, nodeEntity[0].word, {
        at: SlateEditor.end(editor, preNodeEntity[1])
      })
      SlateTransforms.delete(editor, { at: SlatePath.next(preNodeEntity[1]) })
    })

    $body.on('click', domId, handler)
  }
}

function fetchSpeaker(hanzi: string): Promise<IdText[]> {
  const list = {
    我: [
      { id: '1', text: 'wo1', remark: 'wo1' },
      { id: '2', text: 'wo2', remark: 'wo2' },
      { id: '3', text: 'wo3', remark: 'wo3' }
    ],
    的: [
      { id: '1', text: 'de1', remark: 'de1' },
      { id: '2', text: 'de2', remark: 'de2' },
      { id: '3', text: 'de3', remark: 'de3' }
    ]
  } as Record<string, IdText[]>
  return Promise.resolve(list[hanzi] || list['我'])
}

export default defineComponent({
  setup() {
    const fn = new SpeakerFn()
    const editorRef = inject<ShallowRef>('editor')
    const pyList = ref<IdText[]>([])
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
      const text = fn.getValue(editor)
      if (text) {
        pyList.value = await fetchSpeaker(text)
      } else {
        pyList.value = []
      }

      if (fn.isDisabled(editor)) {
        ElMessage.warning({
          message: '选中一个中文字符，并且有不能在其他语句之内',
          grouping: true,
          type: 'warning'
        })
        return
      }

      if (pyList.value.length == 0) {
        ElMessage.warning({
          message: '选中的字符没有不是多音字',
          grouping: true,
          type: 'warning'
        })
        return
      }

      show()
    }

    return () => (
      <ElPopover ref={popover} v-model:visible={visible.value} trigger="contextmenu" hideAfter={0}>
        {{
          reference: () => (
            <EditBarButton text="多音字" icon="speaker" onClick={handleClick}></EditBarButton>
          ),
          default: () => (
            <div class="flex flex-col">
              {pyList.value.map(({ id, text }) => {
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
