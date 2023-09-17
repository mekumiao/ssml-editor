<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { onMounted, onUnmounted, ref, inject } from 'vue'
import { type Position } from '@vueuse/core'
import { useConstrainDragBounds } from './constrain-drag-bounds'
import { emitter } from '@/event-bus'

const emit = defineEmits<{ 'update:visible': [value: boolean]; close: [] }>()
const props = defineProps<{
  visible: boolean
  initialValue?: Position
}>()

const boxRef = ref<HTMLElement>()
const dragRef = ref<HTMLElement>()
const referenceRef = ref<HTMLElement>()
const editorViewRef = inject('box-editor-view')
const allowClose = ref(true)

const { position } = useDraggable(dragRef, { initialValue: props.initialValue })
const { style } = useConstrainDragBounds(boxRef, editorViewRef, position)

function setPosition(opt: Position) {
  position.value = opt
}

defineExpose({
  setPosition,
  withoutAutoClose,
})

onMounted(() => {
  emitter.on('view-click', handleViewClick)
  document.addEventListener('keydown', handleKeyDownEsc)
})

onUnmounted(() => {
  emitter.off('view-click', handleViewClick)
  document.removeEventListener('keydown', handleKeyDownEsc)
})

function handleViewClick(ev: MouseEvent) {
  allowClose.value && isOthreClick(ev) && handleClose()
}

function withoutAutoClose(callback: VoidFunction) {
  try {
    allowClose.value = false
    callback()
  } finally {
    setTimeout(() => (allowClose.value = true))
  }
}

function isOthreClick(ev: MouseEvent) {
  const target = ev.target as HTMLElement
  if (!boxRef.value || !referenceRef.value) return false
  if (referenceRef.value.contains(target)) return false
  if (boxRef.value.contains(target)) return false
  return true
}

function handleClose() {
  emit('update:visible', false)
  emit('close')
}

function handleKeyDownEsc(event: KeyboardEvent) {
  event.code === 'Escape' && handleClose()
}
</script>

<template>
  <div ref="referenceRef" @mousedown.prevent>
    <slot name="reference"></slot>
  </div>
  <Teleport to="body">
    <div
      v-show="visible"
      ref="boxRef"
      class="ssml-editor-root card shadow brag-box user-select-none z-2"
      style="position: fixed"
      :style="style"
      @mousedown.prevent
    >
      <div class="w-100 d-flex flex-row align-items-center">
        <div ref="dragRef" class="w-100" style="height: 40px; cursor: move"></div>
        <span @click="handleClose" class="btn iconfont icon-close fs-5"></span>
      </div>
      <slot></slot>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped></style>
