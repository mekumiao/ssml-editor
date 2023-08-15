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

      $body.off('click', domId, handler)
    })

    $body.on('click', domId, handler)
  }
}

type PyList = { id: string; text: string }[]

function fetchSpeaker(hanzi: string): Promise<PyList> {
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
    const pyList = ref<PyList>([])
    const visiblePopover = ref<boolean>(false)

    return () => (
      <EditBarButton
        text="多音字"
        icon="speaker"
        isPopover={!!pyList.value.length}
        visiblePopover={visiblePopover.value}
        onUpdate:visiblePopover={(value) => {
          visiblePopover.value = value
        }}
        onClick={async (editor) => {
          const text = fn.getValue(editor)
          if (text) {
            pyList.value = await fetchSpeaker(text)
          } else {
            pyList.value = []
          }
        }}
      >
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
                  visiblePopover.value = false
                }}
                onMousedown={withModifiers(() => {}, ['stop', 'prevent'])}
              >
                {text}
              </div>
            )
          })}
        </div>
      </EditBarButton>
    )
  }
})
