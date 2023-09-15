<script setup lang="ts">
import { ElIcon, ElTag } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { sleep } from '@/utils'
import { AudioPlayer } from './audio-player'
import throttle from 'lodash.throttle'

const emit = defineEmits<{ close: [] }>()
const props = defineProps<{ src?: string }>()

const state = reactive({ isLoading: false, isPlaying: false })
const audioPlayer = new AudioPlayer()

const handlePlay = throttle(async () => {
  if (props.src) {
    try {
      state.isLoading = true
      await audioPlayer.load(props.src)
      if (state.isLoading) {
        state.isLoading = false
        state.isPlaying = true
        await audioPlayer.play()
        state.isPlaying = false
      }
    } finally {
      await sleep()
      state.isLoading = false
      state.isPlaying = false
    }
  }
})

function handleCancel() {
  state.isLoading = false
  audioPlayer.cancel()
}

function handlePause() {
  state.isPlaying = false
  audioPlayer.pause()
}

function handleClose() {
  state.isLoading = false
  state.isPlaying = false
  audioPlayer.stop()
  emit('close')
}
</script>

<template>
  <div class="play-tag ms-1">
    <ElTag closable size="small" @close="handleClose">
      <span class="d-flex flex-row align-items-center">
        <span class="d-flex justify-content-center" style="width: 1rem">
          <span @click="handleCancel" v-if="state.isLoading">
            <ElIcon class="is-loading"><Loading></Loading></ElIcon>
          </span>
          <template v-else>
            <span
              v-if="state.isPlaying"
              @click="handlePause"
              class="iconfont icon-pause font-size-12 p-1"
            ></span>
            <span v-else @click="handlePlay" class="iconfont icon-play font-size-12 p-1"></span>
          </template>
        </span>
        <span class="d-inline-block ms-1"></span>
        <span>
          <slot></slot>
        </span>
      </span>
    </ElTag>
  </div>
</template>

<style lang="scss" scoped>
.play-tag {
  .iconfont {
    cursor: pointer;
  }
}
</style>
