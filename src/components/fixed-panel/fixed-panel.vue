<script setup lang="ts">
import { useDraggable, isClient } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useElementSize, useWindowSize } from '@vueuse/core'

const emit = defineEmits<{ dragging: [value: boolean] }>()

const boxRef = ref<HTMLElement>()

const innerWidth = isClient ? window.innerWidth : 200
const innerHeight = isClient ? window.innerHeight : 200

const { x, y } = useDraggable(boxRef, {
  initialValue: { x: innerWidth - 100, y: innerHeight / 2 },
  preventDefault: true,
  onStart: () => {
    emit('dragging', true)
  },
  onEnd: () => {
    emit('dragging', false)
  }
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
    <div
      ref="boxRef"
      class="fixed-panel z-3 user-select-none"
      style="position: fixed"
      :style="moveStyle"
    >
      <slot></slot>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped></style>
