<script setup lang="ts">
defineEmits<{ click: [value: string] }>()
withDefaults(defineProps<{ activate?: boolean; value?: string }>(), { activate: false, value: '' })
</script>

<template>
  <span
    class="tag-item d-inline-block text-white text-center text-nowrap text-truncate"
    :class="{ 'border border-white rounded-pill': activate }"
    @click="$emit('click', value)"
    style="height: 20px; min-width: 60px; max-width: 160px; font-size: 0.5rem; cursor: pointer"
  >
    <slot></slot>
  </span>
</template>

<style lang="scss" scoped></style>
