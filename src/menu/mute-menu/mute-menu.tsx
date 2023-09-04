import { type IDomEditor } from '@wangeditor/editor'
import { defineComponent, ref, withModifiers, shallowRef } from 'vue'
import { BarButton, BarInput } from '@/components'
import { ElPopover } from 'element-plus'
import { MuteFn } from './mute-fn'
import type { LabelValue } from '@/model'

const options: LabelValue[] = [
  { value: '150ms', label: '150ms' },
  { value: '200ms', label: '200ms' },
  { value: '300ms', label: '300ms' },
  { value: '400ms', label: '400ms' },
  { value: '500ms', label: '500ms' },
  { value: '600ms', label: '600ms' },
]

export default defineComponent({
  setup() {
    const fn = shallowRef<MuteFn>()
    const visible = ref(false)
    const inputRef = ref<InstanceType<typeof BarInput>>()

    function show() {
      if (visible.value) return
      visible.value = true
    }

    function hide() {
      if (!visible.value) return
      visible.value = false
    }

    function handleClick(editor: IDomEditor) {
      fn.value ??= new MuteFn(editor)
      if (fn.value.isDisabled()) return
      show()
      inputRef.value?.focus()
    }

    function handleSubmit(text: string | null) {
      hide()
      if (!text) return
      fn.value?.exec({ value: text, label: text })
    }

    return () => (
      <ElPopover v-model:visible={visible.value} trigger="contextmenu" hideAfter={0} width={200}>
        {{
          reference: () => (
            <BarButton text="插入静音" icon="mute" onClick={handleClick}></BarButton>
          ),
          default: () => (
            <div class="d-flex flex-column">
              {options.map(({ value, label }) => {
                return (
                  <div
                    key={value}
                    class="clickable w-100 fs-6 rounded-1 px-3 py-2"
                    onClick={() => handleSubmit(value)}
                    onMousedown={withModifiers(() => {}, ['stop', 'prevent'])}
                  >
                    {label}
                  </div>
                )
              })}
              <BarInput type="text" ref={inputRef} onSubmit={handleSubmit}></BarInput>
            </div>
          ),
        }}
      </ElPopover>
    )
  },
})
