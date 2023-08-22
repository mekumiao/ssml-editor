import { type IDomEditor } from '@wangeditor/editor'
import { defineComponent, ref, withModifiers, shallowRef } from 'vue'
import { BarButton } from '@/components'
import { ElPopover } from 'element-plus'
import { DigitalFn } from './digital-fn'
import type { LabelValue } from '@/model'

const options: LabelValue[] = [
  { value: 'value', label: '读数值' },
  { value: 'digits', label: '读数字' },
  { value: 'telephone', label: '读手机号' }
]

export default defineComponent({
  setup() {
    const fn = shallowRef<DigitalFn>()
    const visible = ref(false)

    function toggle() {
      visible.value = !visible.value
    }

    function handleClick(editor: IDomEditor) {
      fn.value ??= new DigitalFn(editor)
      if (fn.value.isDisabled()) return
      toggle()
    }

    return () => (
      <ElPopover v-model:visible={visible.value} trigger="contextmenu" hideAfter={0}>
        {{
          reference: () => (
            <BarButton text="数字符号" icon="digital" onClick={handleClick}></BarButton>
          ),
          default: () => (
            <div class="d-flex flex-column">
              {options.map(({ label, value }) => {
                return (
                  <div
                    key={value}
                    class="clickable w-100 fs-6 rounded-1 px-3 py-2"
                    onClick={() => {
                      if (fn.value && !fn.value.isDisabled()) {
                        fn.value.exec({ label, value })
                      }
                      toggle()
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
