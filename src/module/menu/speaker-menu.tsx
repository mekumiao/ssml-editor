import throttle from 'lodash.throttle'
import { type IDomEditor } from '@wangeditor/core'
import type { Speaker } from '../custom-types'
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

    return false
  }

  exec(editor: IDomEditor, pinyin: string) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return
    const value = this.getValue(editor)
    if (value == null) return

    const node: Speaker = {
      type: 'speaker',
      domId: genDomID(),
      value: value,
      pinyin: pinyin,
      children: [{ text: '' }]
    }

    SlateTransforms.delete(editor)
    SlateTransforms.insertNodes(editor, node)
    editor.move(1)

    const $body = $('body')
    const domId = `#${node.domId}`

    const handler = throttle((event: Event) => {
      event.preventDefault()

      const [nodeEntity] = SlateEditor.nodes<Speaker>(editor, {
        at: [0],
        match: (n) => {
          if (!SlateElement.isElement(n)) return false
          if (!DomEditor.checkNodeType(n, 'speaker')) return false
          return (n as Speaker).domId === node.domId
        }
      })
      if (nodeEntity == null) return

      const preNodeEntity = SlateEditor.previous(editor, {
        at: nodeEntity[1],
        match: (n) => SlateText.isText(n)
      })
      if (preNodeEntity == null) return

      SlateTransforms.insertText(editor, nodeEntity[0].value, {
        at: SlateEditor.end(editor, preNodeEntity[1])
      })
      SlateTransforms.delete(editor, { at: SlatePath.next(preNodeEntity[1]) })

      // $body.off('click', domId, handler)
    })

    $body.on('click', domId, handler)
  }
}

type IdText = { id: string; text: string }

function fetchSpeaker(hanzi: string): Promise<IdText[]> {
  return Promise.resolve(
    {
      我: [
        { id: '1', text: 'wo1' },
        { id: '2', text: 'wo2' },
        { id: '3', text: 'wo3' }
      ],
      的: [
        { id: '1', text: 'de1' },
        { id: '2', text: 'de2' },
        { id: '3', text: 'de3' }
      ]
    }[hanzi] || []
  )
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
      <ElPopover
        visible={visible.value}
        ref={popover}
        onUpdate:visible={(value) => (visible.value = value)}
        trigger="contextmenu"
        hideAfter={0}
      >
        {{
          reference: () => (
            <EditBarButton text="多音字" icon="speaker" onClick={handleClick}></EditBarButton>
          ),
          default: () => (
            <div class={['flex', 'flex-col']}>
              {pyList.value.map(({ id, text }) => {
                return (
                  <div
                    key={id}
                    class={['btn', 'radius', 'ssml-menu', 'item']}
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
