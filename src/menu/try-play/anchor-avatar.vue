<script setup lang="ts">
import { demoAvatar } from '@/config'
</script>

<template>
  <div
    class="anchor-avatar d-flex flex-column align-items-center text-center justify-content-center"
  >
    <img :src="demoAvatar()" class="rounded-circle" style="height: 40px" />
    <div class="anchor-avatar-name text-white">莫厚渊</div>
  </div>
</template>

<style lang="scss" scoped>
.anchor-avatar {
  .anchor-avatar-name {
    font-size: 12px;
  }
}
</style>
