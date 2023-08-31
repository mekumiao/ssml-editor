import { type IDomEditor } from '@wangeditor/editor'
import { defineComponent, ref, withModifiers, shallowRef } from 'vue'
import { BarButton } from '@/components'
import { selectionTrimEnd } from '@/core/helper'
import { ElPopover } from 'element-plus'
import { EnglishFn } from './english-fn'
import type { LabelValue } from '@/model'
import { useEditorStore } from '@/stores'
import { WANGEDITOR_EVENT } from '@/constant'

export default defineComponent({
  setup() {
    const { globalEditConfig } = useEditorStore()
    const fn = shallowRef<EnglishFn>()
    const englishList = ref<LabelValue[]>([])
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
      fn.value ??= new EnglishFn(editor)
      selectionTrimEnd(editor)
      if (fn.value.isDisabled()) return
      const text = fn.value.getValue()
      if (text) {
        englishList.value = await globalEditConfig.english.fetchData(text)

        if (englishList.value.length <= 0) {
          return editor.emit(WANGEDITOR_EVENT.ERROR, '找不到单词的音标')
        }

        show()
      }
    }

    return () => (
      <ElPopover visible={visible.value} trigger="contextmenu" hideAfter={0}>
        {{
          reference: () => <BarButton text="音标" icon="english" onClick={handleClick}></BarButton>,
          default: () => (
            <div class="d-flex flex-column">
              {englishList.value.map(({ label, value }) => {
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
