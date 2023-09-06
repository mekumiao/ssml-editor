<script setup lang="ts">
import { useTryPlayStore } from '@/stores'
import { serializeToSSML } from '@/serialize'
import { ElIcon } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import { injectConfig } from '@/config'

withDefaults(defineProps<{ disabled?: boolean }>(), { disabled: false })

const tryPlayStore = useTryPlayStore()
const { audioPlayer } = tryPlayStore
const playState = audioPlayer.playState
const loadState = audioPlayer.loadState

const globalEditConfig = injectConfig()

async function handlePlay() {
  if (playState.value === 'playing') {
    audioPlayer.pause()
    return
  }

  try {
    const ssml = serializeToSSML()
    const audio = await globalEditConfig.tryPlay.play(ssml)
    await audioPlayer.load(audio.src)
    audioPlayer.play()
  } catch (error) {
    audioPlayer.pause()
  }
}
</script>

<template>
  <div
    class="play-menu px-2 py-1"
    @click="!disabled && handlePlay()"
    @mousedown.prevent
    :class="{ disabled: disabled }"
  >
    <div class="play-menu-icon d-flex justify-content-center align-items-center">
      <span
        v-if="loadState === 'complete' && playState === 'paused'"
        class="fs-3 iconfont-moyin moyin-icon_play"
      ></span>
      <ElIcon v-else-if="loadState === 'loading'" class="is-loading">
        <Loading></Loading>
      </ElIcon>
      <span v-else class="iconfont icon-pause"></span>
    </div>
    <div class="fw-normal" style="font-size: 0.85rem">24K高清音质</div>
  </div>
</template>

<style lang="scss" scoped>
.play-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 4.5rem;

  border-radius: 0.5rem;

  &.disabled {
    color: #a7a5a5;
  }

  &:not(.disabled):hover {
    background-color: #e5e5e5;
  }

  .play-menu-icon {
    width: 30px;
    height: 30px;
  }
}
</style>
