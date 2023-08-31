import { type IDomEditor } from '@wangeditor/editor'
import { defineComponent, ref, withModifiers, shallowRef } from 'vue'
import { BarButton } from '@/components'
import { ElPopover } from 'element-plus'
import { ReadFn } from './read-fn'
import { readList } from './data'

export default defineComponent({
  setup() {
    const fn = shallowRef<ReadFn>()
    const visible = ref(false)

    function show() {
      if (visible.value) return
      visible.value = true
    }

    function hide() {
      if (!visible.value) return
      visible.value = false
    }

    function handleClick(editor: IDomEditor) {
      fn.value ??= new ReadFn(editor)
      if (fn.value.isDisabled()) return
      show()
    }

    return () => (
      <ElPopover v-model:visible={visible.value} trigger="contextmenu" hideAfter={0}>
        {{
          reference: () => <BarButton text="重音" icon="read" onClick={handleClick}></BarButton>,
          default: () => (
            <div
              class="d-flex flex-column"
              onMousedown={withModifiers(() => {}, ['stop', 'prevent'])}
            >
              {readList.map(({ label, value }) => {
                return (
                  <div
                    key={value}
                    class="clickable w-100 fs-6 rounded-1 px-3 py-2"
                    onClick={() => {
                      if (fn.value && !fn.value.isDisabled()) {
                        fn.value.exec({ label, value })
                      }
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
