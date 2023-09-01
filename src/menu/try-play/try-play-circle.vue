<script setup lang="ts">
import { ref } from 'vue'
import { constrainDragBounds } from '@/components'
import { useDraggable } from '@vueuse/core'
import { demoAvatar } from '@/config'
import { useTryPlayStore } from '@/stores'

const emit = defineEmits<{ 'update:visible': [value: boolean] }>()
defineProps<{ visible: boolean }>()

const boxRef = ref()
const recordClientX = ref<number>(0)
const recordClientY = ref<number>(0)

const tryPlayStore = useTryPlayStore()

const { position } = useDraggable(boxRef, {
  initialValue: { x: window.innerWidth - 15, y: window.innerHeight / 2 - 15 },
  onStart: (_, event) => {
    return isClick(event.clientX, event.clientY) ? false : undefined
  },
})
const { style } = constrainDragBounds(boxRef, position)

function handleMouseup(event: MouseEvent) {
  isClick(event.clientX, event.clientY) && emit('update:visible', false)
}

function handleMousedown(event: MouseEvent) {
  recordClientX.value = event.clientX
  recordClientY.value = event.clientY
}

function isClick(x: number, y: number) {
  const offset = 10
  const res =
    x > recordClientX.value - offset &&
    x < recordClientX.value + offset &&
    y > recordClientY.value - offset &&
    y < recordClientY.value + offset
  return res
}
</script>

<template>
  <div
    v-show="visible"
    ref="boxRef"
    class="try-play-circel user-select-none rounded-circle overflow-hidden"
    :style="style"
    style="position: fixed"
    @mousedown="handleMousedown"
    @mouseup="handleMouseup"
  >
    <div class="anchor-avatar d-flex flex-column justify-content-center align-items-center">
      <img :src="tryPlayStore.speaker.avatar || demoAvatar()" class="rounded-circle" />
      <div class="anchor-avatar-name text-white">{{ tryPlayStore.speaker.displayName }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.try-play-circel {
  height: 90px;
  width: 90px;
  background-color: #2254a1;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .anchor-avatar {
    width: 90px;
    height: 90px;

    img.rounded-circle {
      width: 40px;
    }
    .anchor-avatar-name {
      font-size: 0.5rem;
    }
  }
}
</style>
