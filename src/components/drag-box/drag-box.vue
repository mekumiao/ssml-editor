<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'
import { type Position } from '@vueuse/core'
import { constrainDragBounds } from './constrain-drag-bounds'

const emit = defineEmits<{ 'update:visible': [value: boolean]; close: [] }>()
const props = defineProps<{ visible: boolean; initialValue?: Position }>()

const boxRef = ref<HTMLElement>()
const dragRef = ref<HTMLElement>()
const referenceRef = ref<HTMLElement>()

const { position } = useDraggable(dragRef, {
  initialValue: props.initialValue,
})
const { style } = constrainDragBounds(boxRef, position)

function setPosition(opt: Position) {
  position.value = opt
}

defineExpose({
  setPosition,
})

onMounted(() => {
  window.addEventListener('click', handleWindowClick)
  window.addEventListener('keydown', handleKeyDownEsc)
})

onUnmounted(() => {
  window.addEventListener('click', handleWindowClick)
  window.addEventListener('keydown', handleKeyDownEsc)
})

function handleWindowClick(ev: MouseEvent) {
  isOthreClick(ev) && handleClose()
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
  <div ref="referenceRef">
    <slot name="reference"></slot>
  </div>
  <Teleport to="body">
    <div
      v-show="visible"
      ref="boxRef"
      class="demotestname card shadow brag-box user-select-none"
      style="position: fixed"
      :style="style"
    >
      <div class="w-100 d-flex flex-row align-items-center">
        <div ref="dragRef" class="w-100" style="height: 40px"></div>
        <span @click="handleClose" class="btn iconfont icon-close fs-5"></span>
      </div>
      <slot></slot>
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
