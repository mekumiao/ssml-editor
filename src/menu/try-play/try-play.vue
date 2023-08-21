<script setup lang="ts">
import { FixedPanel } from '@/components'
</script>

<template>
  <FixedPanel>
    <div class="try-play card">
      <div class="try-play-header">
        <span class="iconfont icon-full"></span>
      </div>
      <div class="try-play-body w-100 d-flex flex-row">
        <div class="try-play-left border border-primary w-50">left</div>
        <div class="try-play-right border border-primary w-50">right</div>
      </div>
    </div>
  </FixedPanel>
</template>

<style lang="scss" scoped>
.try-play {
  width: 50vw;
  height: 50vh;

  .try-play-header {
    height: 50px;
  }

  .try-play-body {
    height: 100%;
  }
}
</style>
