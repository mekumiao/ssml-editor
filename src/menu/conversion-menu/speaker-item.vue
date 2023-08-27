<script setup lang="ts">
import { demoAvatar } from '@/config'

withDefaults(defineProps<{ name: string; src?: string }>(), { src: demoAvatar() })
</script>

<template>
  <div class="speaker-item">
    <div class="speaker-head">
      <img :src="src" class="rounded-circle" style="height: 40px" />
    </div>
    <div class="speaker-name">{{ name }}</div>
  </div>
</template>

<style lang="scss" scoped>
.speaker-name {
  font-size: 0.5rem;
}
</style>
