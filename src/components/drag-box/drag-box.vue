<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useElementSize, useWindowSize, type Position } from '@vueuse/core'

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'update:position': [value: Position]
}>()
const props = defineProps<{ visible: boolean; position: Position }>()

const boxRef = ref<HTMLElement>()

const { x, y } = useDraggable(boxRef, {
  initialValue: props.position
})

const { width: boxWidth, height: boxHeight } = useElementSize(boxRef)
const { width: windowWidth, height: windowHeight } = useWindowSize()

watch([x, y], ([x, y]) => {
  emit('update:position', { x, y })
})

const boundary = computed(() => {
  return {
    x: windowWidth.value - boxWidth.value,
    y: windowHeight.value - boxHeight.value
  }
})

const moveStyle = computed(() => {
  const { x, y } = props.position
  if (!boundary.value) return createStyle(x, y)
  const cx = x < 5 ? 5 : x > boundary.value.x ? boundary.value.x - 5 : x
  const cy = y < 5 ? 5 : y > boundary.value.y ? boundary.value.y - 5 : y
  return createStyle(cx, cy)
})

onMounted(() => {
  window.addEventListener('keydown', handleKeyDownEsc)
})

onUnmounted(() => {
  window.addEventListener('keydown', handleKeyDownEsc)
})

function handleClose() {
  emit('update:visible', false)
}

function handleVisible(ev: MouseEvent) {
  const target = ev.target as HTMLElement
  if (boxRef.value && !boxRef.value.contains(target)) {
    props.visible && emit('update:visible', false)
  }
}

function handleKeyDownEsc(event: KeyboardEvent) {
  if (event.code === 'Escape') {
    props.visible && handleClose()
  }
}

function createStyle(x: number, y: number) {
  return `left:${x}px;top:${y}px`
}
</script>

<template>
  <Teleport to="body">
    <div v-show="visible" class="drag-box-mask user-select-none" @click="handleVisible">
      <div ref="boxRef" class="card shadow brag-box" style="position: fixed" :style="moveStyle">
        <div class="w-100 text-end me-2">
          <span @click="handleClose" class="btn iconfont icon-close fs-5"></span>
        </div>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.drag-box-mask {
  background-color: rgba(229, 229, 229, 0.15);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>
