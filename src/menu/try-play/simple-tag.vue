<script setup lang="ts">
import { computed } from 'vue'

defineEmits<{ click: [value: string] }>()
const props = withDefaults(
  defineProps<{
    activate?: boolean
    value?: string
    small?: boolean
  }>(),
  {
    activate: false,
    value: '',
    small: false,
  },
)

const style = computed(() => {
  return props.small
    ? {
        'max-width': '160px',
      }
    : {
        height: '20px',
        'line-height': '20px',
        'font-size': '0.65rem',
        'min-width': '60px',
        'max-width': '160px',
      }
})
</script>

<template>
  <span
    class="tag-item d-inline-block text-white text-center text-nowrap text-truncate rounded-pill"
    :class="{ 'border border-white': activate, 'px-1': small }"
    @click="$emit('click', value)"
    style="cursor: pointer; border: 1px solid transparent; box-sizing: content-box"
    :style="style"
  >
    <slot></slot>
  </span>
</template>

<style lang="scss" scoped></style>
