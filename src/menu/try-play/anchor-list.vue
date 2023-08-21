<script setup lang="ts">
import AnchorAvatar from './anchor-avatar.vue'
</script>

<template>
  <div
    class="anchor-list w-100 d-flex flex-row flex-wrap justify-content-between align-content-start overflow-x-hidden overflow-y-auto"
  >
    <AnchorAvatar v-for="(_, index) in 100" :key="index"></AnchorAvatar>
  </div>
</template>

<style lang="scss" scoped>
.anchor-list {
  height: 37vh;
  &:last-child {
    margin-right: auto;
  }
}
</style>
