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
  return genRandomStr('w-e-insert-english')
}

class EnglishEn {
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
    if (value.length <= 0) return true

    const pattern = new RegExp('[A-Za-z]+')
    if (!pattern.test(value)) return true

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
      bgColor: 'english',
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
        at: [0],
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

function fetchEnglish(word: string): Promise<IdText[]> {
  return Promise.resolve(
    {
      translate: [{ id: '1', text: 'wərd', remark: 'wərd' }],
      global: [{ id: '2', text: 'ˈɡlōbəl', remark: 'ˈɡlōbəl' }]
    }[word] || []
  )
}

export default defineComponent({
  setup() {
    const fn = new EnglishEn()
    const editorRef = inject<ShallowRef>('editor')
    const englishList = ref<IdText[]>([])
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
      if (fn.isDisabled(editor)) {
        ElMessage.warning({
          message: '请选择英文单词',
          grouping: true,
          type: 'warning'
        })
        return
      }

      const text = fn.getValue(editor)
      if (text) {
        englishList.value = await fetchEnglish(text)

        if (englishList.value.length <= 0) {
          ElMessage.warning({
            message: '找不到单词的音标',
            grouping: true,
            type: 'warning'
          })
          return
        }

        show()
      }
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
            <EditBarButton text="音标" icon="english" onClick={handleClick}></EditBarButton>
          ),
          default: () => (
            <div class={['flex', 'flex-col']}>
              {englishList.value.map(({ id, text }) => {
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
