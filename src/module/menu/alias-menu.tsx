import throttle from 'lodash.throttle'
import { type IDomEditor } from '@wangeditor/core'
import type { Sub } from '../custom-types'
import {
  SlateTransforms,
  SlateEditor,
  SlateRange,
  SlateElement,
  DomEditor
} from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import $ from '@/utils/dom'
import { defineComponent } from 'vue'
import EditBarButton from '../../components/EditBarButton.vue'
import { ElMessage } from 'element-plus'

function genDomID(): string {
  return genRandomStr('w-e-insert-alias')
}

class AliasFn {
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

    return false
  }

  exec(editor: IDomEditor) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return
    const value = this.getValue(editor)
    if (value == null) return

    const node: Sub = {
      type: 'ssml-sub',
      domId: genDomID(),
      remark: '别名',
      value: value,
      bgColor: 'alias',
      children: [{ text: value }]
    }

    SlateTransforms.delete(editor)
    SlateTransforms.insertNodes(editor, node)
    // editor.move(1)

    const $body = $('body')
    const domId = `#${node.domId}`

    const handler = throttle((event: Event) => {
      event.preventDefault()

      SlateTransforms.unwrapNodes(editor, {
        at: [0],
        match: (n) => {
          if (!SlateElement.isElement(n)) return false
          if (!DomEditor.checkNodeType(n, 'ssml-sub')) return false
          return (n as Sub).domId === node.domId
        }
      })
    })

    $body.on('click', domId, handler)
  }
}

export default defineComponent({
  setup() {
    const fn = new AliasFn()
    // const editorRef = inject<ShallowRef<IDomEditor>>('editor')
    // const aliasRef = ref<HTMLElement>()
    // const alias = ref('')
    // const popover = ref<PopoverInstance>()
    // const visible = ref(false)
    // const editorSelection = shallowRef()

    // function show() {
    //   if (visible.value) return
    //   visible.value = true
    // }

    // function hide() {
    //   if (!visible.value) return
    //   visible.value = false
    // }

    async function handleClick(editor: IDomEditor) {
      if (fn.isDisabled(editor)) {
        ElMessage.warning({
          message: '选中一个中文字符，并且有不能在其他语句之内',
          grouping: true,
          type: 'warning'
        })
        return
      }

      // show()
      // editorSelection.value = editor.selection
      // aliasRef.value?.focus()

      fn.exec(editor)
    }

    // const onSubmit = {
    //   onSubmit: withModifiers(() => {
    //     hide()
    //     const editor = editorRef?.value
    //     const aliasValue = alias.value
    //     alias.value = ''
    //     if (!editor) return
    //     editor.select(editorSelection.value)
    //     if (fn.isDisabled(editor)) return
    //     fn.exec(editor, aliasValue)
    //   }, ['prevent'])
    // } as any

    return () => (
      <EditBarButton text="别名" icon="alias" onClick={handleClick}></EditBarButton>
      // <ElPopover
      //   ref={popover}
      //   v-model:visible={visible.value}
      //   trigger="contextmenu"
      //   placement="right-end"
      //   hideAfter={0}
      //   width={200}
      // >
      //   {{
      //     reference: () => (
      //       <EditBarButton text="别名" icon="alias" onClick={handleClick}></EditBarButton>
      //     ),
      //     default: () => (
      //       <ElForm {...onSubmit} class="flex flex-row">
      //         <ElInput ref={aliasRef} v-model={alias.value}></ElInput>
      //         <button type="submit" class="btn btn-plain">
      //           确认
      //         </button>
      //       </ElForm>
      //     )
      //   }}
      // </ElPopover>
    )
  }
})
