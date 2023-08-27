import { type IDomEditor } from '@wangeditor/editor'
import { defineComponent, ref, withModifiers, shallowRef } from 'vue'
import { BarButton } from '@/components'
import { ElPopover } from 'element-plus'
import { PinyinFn } from './pinyin-fn'
import { WANGEDITOR_EVENT } from '@/constant'
import type { LabelValue } from '@/model'
import { useEditorStore } from '@/stores'

export default defineComponent({
  setup() {
    const { globalEditConfig } = useEditorStore()
    const fn = shallowRef<PinyinFn>()
    const pyList = ref<LabelValue[]>([])
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
      fn.value ??= new PinyinFn(editor)
      if (fn.value?.isDisabled()) return
      const text = fn.value.getValue()
      if (text) {
        pyList.value = await globalEditConfig.fetchPinyin(text)
      } else {
        pyList.value = []
      }

      if (pyList.value.length == 0) {
        return editor.emit(WANGEDITOR_EVENT.ERROR, '选中的字符没有不是多音字')
      }

      show()
    }

    return () => (
      <ElPopover v-model:visible={visible.value} trigger="contextmenu" hideAfter={0}>
        {{
          reference: () => (
            <BarButton text="多音字" icon="speaker" onClick={handleClick}></BarButton>
          ),
          default: () => (
            <div class="d-flex flex-column">
              {pyList.value.map(({ label, value }) => {
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
