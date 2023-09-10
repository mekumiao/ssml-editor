<script setup lang="ts">
import { useTryPlayStore } from '@/stores'
import { ElIcon } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import { BarButton } from '@/components'
import throttle from 'lodash.throttle'
import { injectConfig } from '@/config'

withDefaults(defineProps<{ disabled?: boolean }>(), { disabled: false })

const tryPlayStore = useTryPlayStore()
const { audioPlayer, play } = tryPlayStore
const playState = audioPlayer.playState
const ssmlEditorConfig = injectConfig()

const handleClick = throttle(async () => {
  await play(ssmlEditorConfig.tryPlay.play)
})
</script>

<template>
  <BarButton @click="handleClick" :disabled="disabled">
    <template #icon>
      <ElIcon v-if="tryPlayStore.isLoading" class="is-loading">
        <Loading></Loading>
      </ElIcon>
      <span v-else-if="playState === 'paused'" class="fs-3 iconfont-moyin moyin-icon_play"></span>
      <span v-else class="iconfont icon-pause"></span>
    </template>
    24K高清音质
  </BarButton>
</template>

<style lang="scss" scoped></style>
