import { type IDomEditor } from '@wangeditor/editor'
import type { P } from '../core/custom-types'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import { defineComponent, inject, ref, withModifiers, type ShallowRef } from 'vue'
import { BarButton } from '@/components'
import { bindClose, unpackVoid } from './helper'
import { ElPopover } from 'element-plus'

function genDomID(): string {
  return genRandomStr('w-e-dom-speaker')
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

    bindClose<P>(editor, 'ssml-p', node.domId, (nodeEntity) => {
      unpackVoid(editor, nodeEntity, (elem) => elem.word)
    })
  }
}

export default defineComponent({
  setup(_props, { emit }) {
    const config = inject<SSMLEditorConfig>('ssml-editor-config')!
    const fn = new SpeakerFn()
    const editorRef = inject<ShallowRef>('editor')
    const pyList = ref<LabelValue[]>([])
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
        pyList.value = await config.fetchSpeaker(text)
      } else {
        pyList.value = []
      }

      if (fn.isDisabled(editor)) return emit('error', '选中一个中文字符，并且有不能在其他语句之内')

      if (pyList.value.length == 0) return emit('error', '选中的字符没有不是多音字')

      show()
    }

    return () => (
      <ElPopover v-model:visible={visible.value} trigger="contextmenu" hideAfter={0}>
        {{
          reference: () => (
            <BarButton text="多音字" icon="speaker" onClick={handleClick}></BarButton>
          ),
          default: () => (
            <div class="d-flex flex-column">
              {pyList.value.map(({ label, value }) => {
                return (
                  <div
                    key={value}
                    class="clickable w-100 fs-6 rounded-1 px-3 py-2"
                    onClick={() => {
                      if (!fn.isDisabled(editorRef?.value)) {
                        fn.exec(editorRef?.value, label)
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
