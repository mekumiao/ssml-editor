<script setup lang="ts">
import EditTitle from './EditTitle.vue'
import EditCore from './EditCore.vue'
import EditBarWrapper from './EditBarWrapper.vue'
</script>

<template>
  <div class="edit-view">
    <EditTitle></EditTitle>
    <div class="edit-box">
      <EditBarWrapper></EditBarWrapper>
      <div class="h h-1"></div>
      <EditCore></EditCore>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
