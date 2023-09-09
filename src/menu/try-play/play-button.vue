<script setup lang="ts">
import { ref } from 'vue'
import { demoAvatar } from '@/config'
import { useTryPlayStore } from '@/stores'
import { ElIcon } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import throttle from 'lodash.throttle'
import { injectConfig } from '@/config'

withDefaults(defineProps<{ disabledClick?: boolean }>(), { disabledClick: false })

const boxRef = ref<HTMLDivElement>()

const tryPlayStore = useTryPlayStore()
const { audioPlayer, play } = tryPlayStore
const playState = audioPlayer.playState
const globalEditConfig = injectConfig()

const handleClick = throttle(async () => {
  await play(globalEditConfig.tryPlay.play)
})

defineExpose({
  divBox: boxRef,
  handleClick,
})
</script>

<template>
  <div
    ref="boxRef"
    class="play-button rounded-circle"
    :style="{ 'background-image': `url(${demoAvatar()})` }"
    @click="!disabledClick && handleClick()"
  >
    <button class="btn w-100 h-100 bg-black bg-opacity-50 text-white rounded-circle border-0">
      <ElIcon v-if="tryPlayStore.isLoading" class="is-loading" color="white">
        <Loading></Loading>
      </ElIcon>
      <span v-else-if="playState === 'paused'" class="iconfont icon-play1"></span>
      <span v-else class="iconfont icon-pause1"></span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.play-button {
  height: 50px;
  width: 50px;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
