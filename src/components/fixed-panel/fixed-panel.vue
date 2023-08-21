<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useElementSize, useWindowSize } from '@vueuse/core'

const boxRef = ref<HTMLElement>()

const { x, y } = useDraggable(boxRef, {
  initialValue: { x: 40, y: 40 }
})

const { width: boxWidth, height: boxHeight } = useElementSize(boxRef)
const { width: windowWidth, height: windowHeight } = useWindowSize()

const boundary = computed(() => {
  return {
    x: windowWidth.value - boxWidth.value,
    y: windowHeight.value - boxHeight.value
  }
})

const moveStyle = computed(() => {
  if (!boundary.value) return createStyle(x.value, y.value)
  const cx = x.value < 5 ? 5 : x.value > boundary.value.x ? boundary.value.x - 5 : x.value
  const cy = y.value < 5 ? 5 : y.value > boundary.value.y ? boundary.value.y - 5 : y.value
  return createStyle(cx, cy)
})

function createStyle(x: number, y: number) {
  return `left:${x}px;top:${y}px`
}
</script>

<template>
  <Teleport to="body">
    <div ref="boxRef" class="card shadow brag-box z-3" style="position: fixed" :style="moveStyle">
      <div class="w-100 text-end me-2">
        <span class="btn iconfont icon-close fs-5"></span>
      </div>
      <slot></slot>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped></style>
