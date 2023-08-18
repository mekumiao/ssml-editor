import { type IDomEditor } from '@wangeditor/editor'
import type { Audio } from '../core/custom-types'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import { defineComponent, ref, shallowRef, type PropType, inject, type ShallowRef } from 'vue'
import { bindClose, bindPlay } from './helper'
import { BarButton, BarSearch } from '@/components'
import { ElDialog } from 'element-plus'
import { playSound } from '@/utils/play'

// 音效功能

function genDomID(): string {
  return genRandomStr('w-e-dom-special')
}

class SpecialFn {
  getValue(editor: IDomEditor): string | null {
    const { selection } = editor
    if (selection == null) return null
    return SlateEditor.string(editor, selection)
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (SlateRange.isExpanded(selection)) return true

    return SlateEditor.string(editor, selection).length > 0
  }

  exec(editor: IDomEditor, opt: Options) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return
    const value = this.getValue(editor)
    if (value == null) return

    const node: Audio = {
      type: 'ssml-audio',
      domId: genDomID(),
      src: opt.value,
      remark: opt.label,
      bgColor: 'special',
      children: [{ text: '' }]
    }

    SlateTransforms.insertNodes(editor, node)
    editor.move(1)

    bindClose<Audio>(editor, 'ssml-audio', node.domId, (nodeEntity) =>
      SlateTransforms.delete(editor, { at: nodeEntity[1] })
    )

    bindPlay<Audio>(editor, 'ssml-audio', node.domId, (nodeEntity) => playSound(nodeEntity[0].src))
  }
}

export type MenuKey = 'first' | 'second' | 'last'

export type Options = { value: string; label: string }

export default defineComponent({
  emits: ['error'],
  props: {
    fetch: {
      type: Function as PropType<
        (filter: {
          search: string
          menuKey: MenuKey
          scene: string
          style: string
        }) => Promise<{ value: string; label: string }[]>
      >,
      required: true
    },
    scenes: { type: Object as PropType<Options[]>, required: true },
    styles: { type: Object as PropType<Options[]>, required: true }
  },
  setup(props, { emit }) {
    const fn = new SpecialFn()
    const visible = ref(false)
    const oldSelection = shallowRef()
    const dataList = ref<Options[]>([])

    const editorRef = inject<ShallowRef<IDomEditor>>('editor')

    async function handleClick(editor: IDomEditor) {
      if (fn.isDisabled(editor)) {
        emit('error', '请选中编辑区，并且不能选中文字')
        return
      }

      visible.value = true
      dataList.value = await props.fetch({ search: '', menuKey: 'first', scene: '', style: '' })

      oldSelection.value = editor.selection
    }

    const handleSubmit = (value: Options) => {
      visible.value = false
      const editor = editorRef?.value
      if (!editor || !value) return
      editor.select(oldSelection.value)
      if (fn.isDisabled(editor)) return

      fn.exec(editor, value)
    }

    return () => (
      <div>
        <BarButton text="音效" icon="special" onClick={handleClick}></BarButton>
        <ElDialog v-model={visible.value} width={500}>
          <BarSearch
            menuItemLabel={{ first: '默认音效', second: '自定义音效', last: '最近音效' }}
            scenes={props.scenes}
            styles={props.styles}
            dataList={dataList.value}
            onSubmit={handleSubmit}
            onFetch={async (options) => {
              const resp = await props.fetch(options)
              dataList.value = resp
            }}
          ></BarSearch>
        </ElDialog>
      </div>
    )
  }
})
