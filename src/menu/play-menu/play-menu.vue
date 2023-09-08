<script setup lang="ts">
import { useTryPlayStore } from '@/stores'
import { serializeToSSML } from '@/serialize'
import { ElIcon } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import { injectConfig } from '@/config'
import { BarButton } from '@/components'
import { emitter } from '@/event-bus'
import { EMITTER_EVENT } from '@/constant'

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
    if (error instanceof Error) {
      emitter.emit(EMITTER_EVENT.ERROR, error.message)
    }
  }
}
</script>

<template>
  <BarButton @click="handlePlay" :disabled="disabled">
    <template #icon>
      <span
        v-if="loadState === 'complete' && playState === 'paused'"
        class="fs-3 iconfont-moyin moyin-icon_play"
      ></span>
      <ElIcon v-else-if="loadState === 'loading'" class="is-loading">
        <Loading></Loading>
      </ElIcon>
      <span v-else class="iconfont icon-pause"></span>
    </template>
    24K高清音质
  </BarButton>
</template>

<style lang="scss" scoped></style>
