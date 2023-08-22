import { useDraggable, useElementSize, useWindowSize } from '@vueuse/core'
import { computed, type Ref } from 'vue'

function createStyle(x: number, y: number) {
  return `left:${x}px;top:${y}px`
}

type UseDraggableReturnType = ReturnType<typeof useDraggable>

export function withLimitView(box: Ref<HTMLElement | undefined>, result: UseDraggableReturnType) {
  const { x, y } = result
  const { width: boxWidth, height: boxHeight } = useElementSize(box)
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const boundary = computed(() => {
    return {
      x: windowWidth.value - boxWidth.value,
      y: windowHeight.value - boxHeight.value
    }
  })

  const style = computed(() => {
    if (!boundary.value) return createStyle(x.value, y.value)
    const cx = x.value < 5 ? 5 : x.value > boundary.value.x ? boundary.value.x - 5 : x.value
    const cy = y.value < 5 ? 5 : y.value > boundary.value.y ? boundary.value.y - 5 : y.value
    return createStyle(cx, cy)
  })

  return { style }
}
