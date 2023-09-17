import { useElementSize, useWindowSize } from '@vueuse/core'
import { computed, type Ref } from 'vue'

function createStyle(x: number, y: number) {
  return `left:${x}px;top:${y}px`
}

export function useConstrainDragBounds(
  box: Ref<HTMLElement | undefined>,
  position: Ref<{
    x: number
    y: number
  }>,
) {
  const { width: boxWidth, height: boxHeight } = useElementSize(box)
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const boundary = computed(() => {
    return {
      x: windowWidth.value - boxWidth.value,
      y: windowHeight.value - boxHeight.value,
    }
  })

  const style = computed(() => {
    const x = position.value.x
    const y = position.value.y
    const cx = x < 5 ? 5 : x > boundary.value.x ? boundary.value.x - 5 : x
    const cy = y < 5 ? 5 : y > boundary.value.y ? boundary.value.y - 5 : y
    return createStyle(cx, cy)
  })

  return { style }
}
