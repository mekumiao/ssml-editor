<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'
import { type Position } from '@vueuse/core'
import { withLimitView } from '@/components'

const emit = defineEmits<{ 'update:visible': [value: boolean]; close: [] }>()
const props = defineProps<{ visible: boolean; initialValue?: Position }>()

const boxRef = ref<HTMLElement>()

const { position } = useDraggable(boxRef, {
  initialValue: props.initialValue
})
const { style } = withLimitView(boxRef, position)

function setPosition(opt: Position) {
  position.value = opt
}

defineExpose({
  setPosition
})

onMounted(() => {
  window.addEventListener('keydown', handleKeyDownEsc)
})

onUnmounted(() => {
  window.addEventListener('keydown', handleKeyDownEsc)
})

function handleClose(ev: MouseEvent) {
  const target = ev.target as HTMLElement
  if (boxRef.value && !boxRef.value.contains(target) && props.visible) {
    emit('update:visible', false)
    emit('close')
  }
}

function handleKeyDownEsc(event: KeyboardEvent) {
  if (event.code === 'Escape' && props.visible) {
    emit('update:visible', false)
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-show="visible" class="drag-box-mask user-select-none" @click="handleClose">
      <div ref="boxRef" class="card shadow brag-box" style="position: fixed" :style="style">
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
