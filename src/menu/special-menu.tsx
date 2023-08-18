import { type IDomEditor } from '@wangeditor/editor'
import type { Sub } from '../core/custom-types'
import { SlateTransforms, SlateEditor, SlateRange } from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import { defineComponent, ref, shallowRef, type PropType, inject, type ShallowRef } from 'vue'
import { bindClose, unpackVoid } from './helper'
import { BarButton, BarSearch } from '@/components'
import { ElDialog } from 'element-plus'

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

  exec(editor: IDomEditor, special: string) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return
    const value = this.getValue(editor)
    if (value == null) return

    const node: Sub = {
      type: 'ssml-sub',
      domId: genDomID(),
      remark: `[${special}]`,
      alias: special,
      value: value,
      bgColor: 'special',
      children: [{ text: '' }]
    }

    SlateTransforms.delete(editor)
    SlateTransforms.insertNodes(editor, node)

    bindClose<Sub>(editor, 'ssml-sub', node.domId, (nodeEntity) =>
      unpackVoid(editor, nodeEntity, (elem) => elem.value)
    )
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

      dataList.value = await props.fetch({ search: '', menuKey: 'first', scene: '', style: '' })

      visible.value = true
      oldSelection.value = editor.selection
    }

    const handleSubmit = (value: string) => {
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
