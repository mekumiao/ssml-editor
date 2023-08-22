<script setup lang="ts">
import AnchorAvatar from './anchor-avatar.vue'
</script>

<template>
  <div
    style="height: 170px"
    class="w-100 d-flex flex-row flex-wrap justify-content-start overflow-x-hidden overflow-y-auto"
  >
    <div class="m-2" v-for="(_, index) in 100" :key="index">
      <AnchorAvatar></AnchorAvatar>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
