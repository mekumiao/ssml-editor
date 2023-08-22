<script setup lang="ts">
defineProps<{ isActivate?: boolean }>()
</script>

<template>
  <div class="tag-item p-2 text-white text-center" :class="[isActivate ? 'activate' : null]">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.tag-item {
  cursor: pointer;
  color: rgba(189, 195, 199, 0.8);
  font-size: 0.8rem;
  width: 60px;
}

.activate {
  background-color: beige;
  border-color: white;
  color: white;
  opacity: 1;
}
</style>
