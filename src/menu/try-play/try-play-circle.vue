<script setup lang="ts">
import { ref, inject, onMounted, type Ref } from 'vue'
import { useConstrainDragBounds } from '@/components'
import { useDraggable, useElementBounding } from '@vueuse/core'
import { useTryPlayStore } from '@/stores'
import PlayButton from './play-button.vue'

const emit = defineEmits<{ 'update:visible': [value: boolean] }>()
defineProps<{ visible: boolean }>()

const boxRef = ref<HTMLDivElement>()
const dragContainerBoxRef = inject<Ref<HTMLElement | undefined>>('dragContainerBox')
const editorViewBoxBounds = useElementBounding(dragContainerBoxRef)
const playButtonRef = ref<InstanceType<typeof PlayButton>>()
const recordClientX = ref<number>(0)
const recordClientY = ref<number>(0)

const tryPlayStore = useTryPlayStore()

const { position } = useDraggable(boxRef, {
  onStart: (_, event) => {
    return isClick(event.clientX, event.clientY) ? false : undefined
  },
})
const { style } = useConstrainDragBounds(boxRef, dragContainerBoxRef, position)

onMounted(() => {
  const point = {
    x: editorViewBoxBounds.x.value + (editorViewBoxBounds.width.value - 90 - 5),
    y: editorViewBoxBounds.y.value + (editorViewBoxBounds.height.value - 90) / 2,
  }
  position.value = point
})

function handleMouseup(event: MouseEvent) {
  const callback = () => {
    if (!isClick(event.clientX, event.clientY)) return
    if (isPlayButtonClick(event)) return playButtonRef.value?.handleClick()
    return emit('update:visible', false)
  }

  callback()
  resetRecordClient()
}

function resetRecordClient() {
  recordClientX.value = 0
  recordClientY.value = 0
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

function isPlayButtonClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  return playButtonRef.value?.divBox?.contains(target) || false
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
    <div class="avatar d-flex flex-column justify-content-center align-items-center">
      <PlayButton ref="playButtonRef" disabled-click :size="40"></PlayButton>
      <div class="text-white" style="font-size: 0.65rem">
        {{ tryPlayStore.speaker.displayName }}
      </div>
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

  .avatar {
    width: 90px;
    height: 90px;
  }
}
</style>
