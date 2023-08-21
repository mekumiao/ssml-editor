<script setup lang="ts">
import { ref } from 'vue'

const src = ref<string>(`
  https://mobvoi-speech-public.mobvoi.com/headerImage/4314c841777e4d20901cd5d04a28e91a.png?iopcmd=thumbnail&type=8&width=80&height=80`)
</script>

<template>
  <div class="try-play-circel rounded-circle overflow-hidden">
    <div class="anchor-avatar d-flex flex-column justify-content-center align-items-center">
      <img :src="src" class="rounded-circle" />
      <div class="anchor-avatar-name text-white">膜厚渊</div>
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
