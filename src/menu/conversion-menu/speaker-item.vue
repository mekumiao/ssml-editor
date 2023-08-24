<script setup lang="ts">
withDefaults(defineProps<{ name: string; img?: string }>(), {
  img: 'https://img.sdaxia.top/upload/4314c841777e4d20901cd5d04a28e91a.png'
})
</script>

<template>
  <div class="speaker-item">
    <div class="speaker-head">
      <img :src="img" class="rounded-circle" style="height: 40px" />
    </div>
    <div class="speaker-name">{{ name }}</div>
  </div>
</template>

<style lang="scss" scoped>
.speaker-name {
  font-size: 0.5rem;
}
</style>
