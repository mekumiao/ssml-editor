import throttle from 'lodash.throttle'
import { type IDomEditor } from '@wangeditor/core'
import type { Sub } from '../custom-types'
import {
  SlateTransforms,
  SlateEditor,
  SlateRange,
  SlateElement,
  DomEditor,
  SlateText,
  SlatePath
} from '@wangeditor/editor'
import { genRandomStr } from '@/utils/random'
import $ from '@/utils/dom'
import { defineComponent, inject, ref, shallowRef, withModifiers, type ShallowRef } from 'vue'
import EditBarButton from '../../components/EditBarButton.vue'
import { ElForm, ElIcon, ElInput, ElMessage, ElPopover, type PopoverInstance } from 'element-plus'
import { Promotion } from '@element-plus/icons-vue'

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

  exec(editor: IDomEditor, alias: string) {
    if (this.isDisabled(editor)) return
    const { selection } = editor
    if (selection == null) return
    const value = this.getValue(editor)
    if (value == null) return

    const node: Sub = {
      type: 'ssml-sub',
      domId: genDomID(),
      remark: `[${alias}]`,
      alias: alias,
      value: value,
      bgColor: 'alias',
      children: [{ text: '' }]
    }

    SlateTransforms.delete(editor)
    SlateTransforms.insertNodes(editor, node)

    const $body = $('body')
    const domId = `#${node.domId}`

    const handler = throttle((event: Event) => {
      event.preventDefault()

      const [nodeEntity] = SlateEditor.nodes<Sub>(editor, {
        at: [],
        match: (n) => {
          if (!SlateElement.isElement(n)) return false
          if (!DomEditor.checkNodeType(n, 'ssml-sub')) return false
          return (n as Sub).domId === node.domId
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
    })

    $body.on('click', domId, handler)
  }
}

export default defineComponent({
  setup() {
    const fn = new AliasFn()
    const editorRef = inject<ShallowRef<IDomEditor>>('editor')
    const aliasRef = ref<HTMLElement>()
    const alias = ref('')
    const popover = ref<PopoverInstance>()
    const visible = ref(false)
    const editorSelection = shallowRef()

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
          message: '选中一个中文字符，并且有不能在其他语句之内',
          grouping: true,
          type: 'warning'
        })
        return
      }

      show()
      editorSelection.value = editor.selection
      aliasRef.value?.focus()
    }

    const onSubmit = {
      onSubmit: withModifiers(() => {
        hide()
        const editor = editorRef?.value
        const aliasValue = alias.value
        alias.value = ''
        if (!editor) return
        editor.select(editorSelection.value)
        if (fn.isDisabled(editor)) return
        fn.exec(editor, aliasValue)
      }, ['prevent'])
    } as any

    return () => (
      <ElPopover
        ref={popover}
        v-model:visible={visible.value}
        trigger="contextmenu"
        placement="right-end"
        hideAfter={0}
        width={200}
      >
        {{
          reference: () => (
            <EditBarButton text="别名" icon="alias" onClick={handleClick}></EditBarButton>
          ),
          default: () => (
            <ElForm {...onSubmit} class="flex flex-row">
              <ElInput ref={aliasRef} v-model={alias.value}>
                {{
                  append: () => (
                    <ElIcon>
                      <Promotion></Promotion>
                    </ElIcon>
                  )
                }}
              </ElInput>
            </ElForm>
          )
        }}
      </ElPopover>
    )
  }
})
