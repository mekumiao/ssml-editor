<script setup lang="ts">
import { demoAvatar } from '@/config'
import type { SpeakerAvatarData } from './data'

defineEmits<{ click: [value: string] }>()
withDefaults(defineProps<{ activate?: boolean; data?: SpeakerAvatarData }>(), {
  activate: false,
  data: () => ({ label: '', value: '' }),
})
</script>

<template>
  <div
    class="anchor-avatar d-flex flex-column align-items-center text-center justify-content-center position-relative"
    @click="$emit('click', data.value)"
  >
    <span
      v-if="!data.isFree"
      class="position-absolute top-0 start-100 translate-middle text-bg-danger text-nowrap rounded px-1"
      style="font-size: 0.65rem"
      >付费</span
    >
    <img
      :src="data.avatar || demoAvatar()"
      class="rounded-circle"
      style="height: 40px; width: 40px"
      :class="{ 'border border-2 border-warning': activate }"
    />
    <div class="anchor-avatar-name text-white">{{ data.label }}</div>
  </div>
</template>

<style lang="scss" scoped>
.anchor-avatar {
  .anchor-avatar-name {
    font-size: 12px;
  }
}
</style>
