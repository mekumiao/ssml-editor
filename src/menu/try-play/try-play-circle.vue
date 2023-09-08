<script setup lang="ts">
import { ref } from 'vue'
import { constrainDragBounds } from '@/components'
import { useDraggable } from '@vueuse/core'
import { demoAvatar, injectConfig } from '@/config'
import { useTryPlayStore } from '@/stores'
import { serializeToSSML } from '@/serialize'

const emit = defineEmits<{ 'update:visible': [value: boolean] }>()
defineProps<{ visible: boolean }>()

const boxRef = ref<HTMLDivElement>()
const btnPlayRef = ref<HTMLButtonElement>()
const recordClientX = ref<number>(0)
const recordClientY = ref<number>(0)

const tryPlayStore = useTryPlayStore()
const globalEditConfig = injectConfig()

const { audioPlayer } = tryPlayStore
const playState = audioPlayer.playState

const { position } = useDraggable(boxRef, {
  initialValue: { x: window.innerWidth - 15, y: window.innerHeight / 2 - 15 },
  onStart: (_, event) => {
    return isClick(event.clientX, event.clientY) ? false : undefined
  },
})
const { style } = constrainDragBounds(boxRef, position)

function handleMouseup(event: MouseEvent) {
  const callback = () => {
    if (!isClick(event.clientX, event.clientY)) return
    if (isBtnPlayClick(event)) return handlePlay()
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

function isBtnPlayClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  return btnPlayRef.value?.contains(target) || false
}

async function handlePlay() {
  if (playState.value === 'playing') {
    audioPlayer.pause()
  } else {
    try {
      const ssml = serializeToSSML()
      const audio = await globalEditConfig.tryPlay.play(ssml)
      audioPlayer.load(audio.src)
      audioPlayer.play()
    } catch (error) {
      audioPlayer.pause()
    }
  }
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
      <div class="position-relative rounded-circle" style="height: 40px">
        <img :src="tryPlayStore.speaker.avatar || demoAvatar()" class="rounded-circle" />
        <button
          ref="btnPlayRef"
          class="btn w-100 h-100 position-absolute top-50 start-50 translate-middle bg-black bg-opacity-50 text-white rounded-circle"
        >
          <span v-if="playState === 'paused'" class="iconfont icon-play1"></span>
          <span v-else class="iconfont icon-pause1"></span>
        </button>
      </div>
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
