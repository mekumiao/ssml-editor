import { defineComponent, ref, shallowRef } from 'vue'
import { BarButton, BarInput } from '@/components'
import { ElPopover } from 'element-plus'
import { AliasFn } from './alias-fn'
import type { IDomEditor } from '@wangeditor/editor'

export default defineComponent({
  setup() {
    const fn = shallowRef<AliasFn>()
    const inputRef = ref()
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
      fn.value ??= new AliasFn(editor)
      if (fn.value.isDisabled()) return
      show()
      inputRef.value.focus()
    }

    function handleSubmit(text: string | null) {
      hide()
      if (text) {
        fn.value?.exec({ value: text, label: text })
      }
    }

    return () => (
      <ElPopover
        v-model:visible={visible.value}
        trigger="contextmenu"
        placement="right-end"
        hideAfter={0}
        width={200}
      >
        {{
          reference: () => <BarButton text="别名" icon="alias" onClick={handleClick}></BarButton>,
          default: () => <BarInput ref={inputRef} onSubmit={handleSubmit}></BarInput>
        }}
      </ElPopover>
    )
  }
})
