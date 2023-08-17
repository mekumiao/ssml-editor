import throttle from 'lodash.throttle'
import { type IDomEditor } from '@wangeditor/editor'
import type { IdText, P } from '../core/custom-types'
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
import {
  defineComponent,
  inject,
  ref,
  withModifiers,
  type ShallowRef,
  resolveDynamicComponent
} from 'vue'
import EditBarButton from './EditBarButton.vue'
import { selectionTrimEnd } from '../core/helper'

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

    if (!/^[A-Za-z]+$/gi.test(value)) return true

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

function fetchEnglish(word: string): Promise<IdText[]> {
  const list = {
    translate: [{ id: '1', text: 'wərd', remark: 'wərd' }],
    global: [{ id: '2', text: 'ˈɡlōbəl', remark: 'ˈɡlōbəl' }]
  } as Record<string, IdText[]>
  return Promise.resolve(list[word] || list['translate'])
}

export default defineComponent({
  emits: ['error'],
  props: ['popover', 'fetch'],
  setup(props, { emit }) {
    const fn = new EnglishEn()
    const editorRef = inject<ShallowRef>('editor')
    const englishList = ref<IdText[]>([])
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
      selectionTrimEnd(editor)
      if (fn.isDisabled(editor)) return emit('error', '请选择英文单词')

      const text = fn.getValue(editor)
      if (text) {
        englishList.value = await (props.fetch || fetchEnglish)(text)

        if (englishList.value.length <= 0) return emit('error', '找不到单词的音标')

        show()
      }
    }

    const MyPopover = resolveDynamicComponent(props.popover) as any

    return () => (
      <MyPopover visible={visible.value} trigger="contextmenu" hideAfter={0}>
        {{
          reference: () => (
            <EditBarButton text="音标" icon="english" onClick={handleClick}></EditBarButton>
          ),
          default: () => (
            <div class="flex flex-col">
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
      </MyPopover>
    )
  }
})
