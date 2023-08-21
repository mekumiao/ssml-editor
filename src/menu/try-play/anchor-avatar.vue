<script setup lang="ts">
import { ref } from 'vue'

const src = ref<string>(`
  https://mobvoi-speech-public.mobvoi.com/headerImage/4314c841777e4d20901cd5d04a28e91a.png?iopcmd=thumbnail&type=8&width=80&height=80`)
</script>

<template>
  <div class="anchor-avatar d-flex flex-column justify-content-center">
    <img :src="src" class="rounded-circle" />
    <div class="anchor-avatar-name text-white">膜厚渊</div>
  </div>
</template>

<style lang="scss" scoped>
.anchor-avatar {
  width: 5vh;
  height: 10vh;

  .anchor-avatar-name {
    font-size: 0.5rem;
  }
}
</style>
