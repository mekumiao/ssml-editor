<script setup lang="ts">
import { demoAvatar } from '@/config'
import type { StyleAvatarData } from './data'

defineEmits<{ click: [value: string] }>()
defineProps<{ activate?: boolean; data?: StyleAvatarData }>()
</script>

<template>
  <div
    class="anchor-avatar d-flex flex-column align-items-center text-center justify-content-center position-relative"
    @click="$emit('click', data?.value)"
  >
    <img
      :src="data?.avatar || demoAvatar()"
      class="rounded-circle"
      style="height: 30px"
      :class="{ 'border border-2 border-warning': activate }"
    />
    <div class="anchor-avatar-name text-white" style="font-size: 0.5rem">{{ data?.label }}</div>
  </div>
</template>

<style lang="scss" scoped>
.anchor-avatar {
  .anchor-avatar-name {
    font-size: 12px;
  }
}
</style>
