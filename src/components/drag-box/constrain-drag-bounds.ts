import { useElementSize, useElementBounding, type MaybeComputedElementRef } from '@vueuse/core'
import { computed, type Ref } from 'vue'

function createStyle(x: number, y: number) {
  return `left:${x}px;top:${y}px`
}

function constrainRange(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value
}

function boundaryRef(
  box: MaybeComputedElementRef,
  containerBox: MaybeComputedElementRef,
  offset: number,
) {
  const { width, height } = useElementSize(box)
  const { x, y, width: windowWidth, height: windowHeight } = useElementBounding(containerBox)
  return computed(() => {
    return {
      minX: x.value + offset,
      minY: y.value + offset,
      maxX: x.value + windowWidth.value - width.value - offset,
      maxY: y.value + windowHeight.value - height.value - offset,
    }
  })
}

export function useConstrainDragBounds(
  box: MaybeComputedElementRef,
  containerBox: MaybeComputedElementRef,
  position: Ref<{ x: number; y: number }>,
) {
  const boundary = boundaryRef(box, containerBox, 5)
  const style = computed(() => {
    const cx = constrainRange(position.value.x, boundary.value.minX, boundary.value.maxX)
    const cy = constrainRange(position.value.y, boundary.value.minY, boundary.value.maxY)
    return createStyle(cx, cy)
  })
  return { style }
}
