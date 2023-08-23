<script setup lang="ts">
import { ref } from 'vue'

const src = ref<string>(`https://img.sdaxia.top/upload/4314c841777e4d20901cd5d04a28e91a.png`)
</script>

<template>
  <div
    class="anchor-avatar d-flex flex-column align-items-center text-center justify-content-center"
  >
    <img :src="src" class="rounded-circle" style="height: 40px" />
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
