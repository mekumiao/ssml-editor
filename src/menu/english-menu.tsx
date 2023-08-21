import { type IDomEditor } from '@wangeditor/editor'
import type { P } from '../core/custom-types'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import { defineComponent, inject, ref, withModifiers, type ShallowRef } from 'vue'
import { BarButton } from '@/components'
import { selectionTrimEnd } from '../core/helper'
import { bindClose, unpackVoid } from './helper'
import { ElPopover } from 'element-plus'
import { PROVIDER_KEY } from '@/constant'

function genDomID(): string {
  return genRandomStr('w-e-dom-english')
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

    bindClose<P>(editor, 'ssml-p', node.domId, (nodeEntity) =>
      unpackVoid(editor, nodeEntity, (elem) => elem.word)
    )
  }
}

function fetchEnglish(word: string): Promise<LabelValue[]> {
  const list = {
    world: [{ label: 'wərd', value: 'wərd' }],
    global: [{ label: 'ˈɡlōbəl', value: 'ˈɡlōbəl' }]
  } as Record<string, LabelValue[]>
  return Promise.resolve(list[word] || list['world'])
}

export default defineComponent({
  emits: ['error'],
  props: ['popover', 'fetch'],
  setup(props, { emit }) {
    const fn = new EnglishEn()
    const editorRef = inject<ShallowRef<IDomEditor>>(PROVIDER_KEY.EDITOR)
    const englishList = ref<LabelValue[]>([])
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

    return () => (
      <ElPopover visible={visible.value} trigger="contextmenu" hideAfter={0}>
        {{
          reference: () => <BarButton text="音标" icon="english" onClick={handleClick}></BarButton>,
          default: () => (
            <div class="d-flex flex-column">
              {englishList.value.map(({ label, value }) => {
                return (
                  <div
                    key={value}
                    class="clickable w-100 fs-6 rounded-1 px-3 py-2"
                    onClick={() => {
                      if (editorRef && !fn.isDisabled(editorRef?.value)) {
                        fn.exec(editorRef?.value, value)
                      }
                      hide()
                    }}
                    onMousedown={withModifiers(() => {}, ['stop', 'prevent'])}
                  >
                    {label}
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
