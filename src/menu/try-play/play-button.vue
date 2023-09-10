<script setup lang="ts">
import { computed, ref, type CSSProperties } from 'vue'
import { demoAvatar } from '@/config'
import { useTryPlayStore } from '@/stores'
import { ElIcon } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import throttle from 'lodash.throttle'
import { injectConfig } from '@/config'

const props = withDefaults(defineProps<{ disabledClick?: boolean; size?: number }>(), {
  disabledClick: false,
  size: 50,
})

const boxRef = ref<HTMLDivElement>()

const tryPlayStore = useTryPlayStore()
const { audioPlayer, play } = tryPlayStore
const playState = audioPlayer.playState
const ssmlEditorConfig = injectConfig()

const styleObject = computed<CSSProperties>(() => ({
  'background-image': `url(${tryPlayStore.speaker.avatar || demoAvatar()})`,
  width: `${props.size}px`,
  height: `${props.size}px`,
}))

const handleClick = throttle(async () => {
  await play(ssmlEditorConfig.tryPlay.play)
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
    :style="styleObject"
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
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
