import { type IDomEditor } from '@wangeditor/editor'
import { defineComponent, inject, ref, withModifiers, shallowRef } from 'vue'
import { BarButton } from '@/components'
import { selectionTrimEnd } from '../../core/helper'
import { ElPopover } from 'element-plus'
import { EMITTER_EVENT, PROVIDER_KEY } from '@/constant'
import { emitter } from '@/event-bus'
import { EnglishEn } from './english-fn'
import type { SSMLEditorConfig } from '@/config'
import type { LabelValue } from '@/model'

export default defineComponent({
  setup() {
    const fn = shallowRef<EnglishEn>()
    const config = inject<SSMLEditorConfig>(PROVIDER_KEY.EDITORCONFIG)!
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
      fn.value ??= new EnglishEn(editor)
      selectionTrimEnd(editor)

      if (fn.value.isDisabled()) return
      const text = fn.value.getValue()
      if (text) {
        englishList.value = await config.fetchEnglish(text)

        if (englishList.value.length <= 0) {
          return emitter.emit(EMITTER_EVENT.ERROR, '找不到单词的音标')
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
          )
        }}
      </ElPopover>
    )
  }
})
