import { type IDomEditor } from '@wangeditor/editor'
import { defineComponent, shallowRef } from 'vue'
import { BarButton } from '@/components'
import { ContinuousFn } from './continuous-fn'

export default defineComponent({
  setup() {
    const fn = shallowRef<ContinuousFn>()

    function handleClick(editor: IDomEditor) {
      fn.value ??= new ContinuousFn(editor)
      if (fn.value.isDisabled()) return
      fn.value.exec()
    }

    return () => <BarButton text="连读" icon="continuous" onClick={handleClick}></BarButton>
  }
})
