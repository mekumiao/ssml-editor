import { type IDomEditor } from '@wangeditor/editor'
import { defineComponent, ref, withModifiers, shallowRef } from 'vue'
import { BarButton } from '@/components'
import { ElPopover } from 'element-plus'
import { ChangespeedFn } from './changespeed-fn'
import { rates } from './data'

export default defineComponent({
  setup() {
    const fn = shallowRef<ChangespeedFn>()
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
      fn.value ??= new ChangespeedFn(editor)
      if (fn.value.isDisabled()) return
      show()
    }

    return () => (
      <ElPopover
        style={{ padding: '0px' }}
        v-model:visible={visible.value}
        trigger="contextmenu"
        hideAfter={0}
      >
        {{
          reference: () => (
            <BarButton text="局部变速" icon="changespeed" onClick={handleClick}></BarButton>
          ),
          default: () => (
            <div
              class="d-flex flex-column overflow-x-hidden overflow-y-scroll"
              style="height:15rem"
            >
              {rates.map(({ label, value }) => {
                return (
                  <div
                    key={value}
                    class="clickable w-100 fs-6 rounded-1 px-3 py-2"
                    onClick={() => {
                      fn.value?.exec({ label, value })
                      hide()
                    }}
                    onMousedown={withModifiers(() => {}, ['stop', 'prevent'])}
                  >
                    {label}
                  </div>
                )
              })}
            </div>
          ),
        }}
      </ElPopover>
    )
  },
})
