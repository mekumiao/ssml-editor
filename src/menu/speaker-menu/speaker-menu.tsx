import { type IDomEditor } from '@wangeditor/editor'
import { defineComponent, inject, ref, withModifiers, shallowRef } from 'vue'
import { BarButton } from '@/components'
import { ElPopover } from 'element-plus'
import { emitter } from '@/event-bus'
import { SpeakerFn } from './speaker-fn'
import type { SSMLEditorConfig } from '@/config'
import { EMITTER_EVENT, PROVIDER_KEY } from '@/constant'
import type { LabelValue } from '@/model'

export default defineComponent({
  setup() {
    const config = inject<SSMLEditorConfig>(PROVIDER_KEY.EDITORCONFIG)!
    const fn = shallowRef<SpeakerFn>()
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
      fn.value ??= new SpeakerFn(editor)
      if (fn.value?.isDisabled()) return
      const text = fn.value.getValue()
      if (text) {
        pyList.value = await config.fetchSpeaker(text)
      } else {
        pyList.value = []
      }

      if (pyList.value.length == 0)
        return emitter.emit(EMITTER_EVENT.ERROR, '选中的字符没有不是多音字')

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
          )
        }}
      </ElPopover>
    )
  }
})
