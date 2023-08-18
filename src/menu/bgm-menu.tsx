import { type IDomEditor } from '@wangeditor/editor'
import { defineComponent, ref, shallowRef, type PropType, inject, type ShallowRef } from 'vue'
import { BarButton, BarSearch } from '@/components'
import { ElDialog } from 'element-plus'

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
    const visible = ref(false)
    const oldSelection = shallowRef()
    const dataList = ref<Options[]>([])

    const editorRef = inject<ShallowRef<IDomEditor>>('editor')

    async function handleClick(editor: IDomEditor) {
      dataList.value = await props.fetch({ search: '', menuKey: 'first', scene: '', style: '' })

      visible.value = true
      oldSelection.value = editor.selection
    }

    const handleSubmit = (value: Options) => {
      visible.value = false
      const editor = editorRef?.value
      if (!editor || !value) {
        emit('error', '背景音乐值无效')
        return
      }

      editor.emit('updateBgm', value)
    }

    return () => (
      <div>
        <BarButton text="配乐" icon="bgm" onClick={handleClick}></BarButton>
        <ElDialog v-model={visible.value} width={500}>
          <BarSearch
            menuItemLabel={{ first: '默认配乐', second: '自定义配乐', last: '最近配乐' }}
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
